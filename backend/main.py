from fastapi import Body, FastAPI, HTTPException, UploadFile, File
from database_manager import DatabaseManager
from fastapi.middleware.cors import (
    CORSMiddleware,
)  # CORS = Cross Origin Resource Sharing
from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional, Union
from pymongo import MongoClient
from model import *

# from log_ingestor import LogIngestor
from typing import List
import uvicorn
from pydantic import BaseModel
from file_handler import FileHandler
from graph import GraphManager
from user_activity_logger import userActivityLogger
import socket


##########################################################################################
# Here in the main I feel as though certain sections warrant there own context descriptions
# because everythin stems from this file. For example everything from lines 26-85 would
# warrant their own context description and so on with the chunks of code that have the http
# methods. As I said in some of my other notes I think global variables warrant thier own
# description and anything not working for us in terms of improvement should be outlined
# in its own section.
##########################################################################################

# app object
app = FastAPI()
# client = MongoClient("mongodb://localhost:27017/")
# b = client["ARCANA"]
db_manager = DatabaseManager(db_name="ARCANA")

from database import (
    fetch_one_project,
    fetch_all_projects,
    create_project,
    update_project,
    remove_project,
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"message": "Welcome to ARCANA API"}

stored_initials = ""

#set initials
@app.post("/api/setInitials")
async def set_initials(data: InitialsData):
    global stored_initials
    stored_initials = data.initials

#get initials
@app.get("/api/getInitials", response_model=InitialsData)
async def get_initials():
    return InitialsData(initials=stored_initials)

# Ingest logs API
@app.post("/api/ingestLogs")
async def ingest_logs(files: List[UploadFile] = File(...)):
    try:
        fh = FileHandler("uploads")

    
        # Clear the contents of the uploads folder before saving new files
        fh.delete_all_files()
        for file in files:
            fh.save_file_in_directory(file)
        timestamps = fh.get_earliest_latest_timestamps()

    except Exception as e:
        return {"error_message": f"Error occurred: {e}"}
    else:
        return {"message": "Logs ingested successfully", **timestamps}


# Retrieves all projects in DB
@app.get("/api/projects", response_model=List[Project])
async def get_all_projects():
    try:
        projects = db_manager.get_all_projects()
        return projects
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.get("/api/getproject/{project_name}", response_model=Project)
async def get_project_by_name(project_name: str):
    try:
        project = db_manager.get_project_by_name(project_name)
        return project
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# #FIXME not implemented fully
# @app.get("/api/project{project_name}", response_model=Project)
# async def get_project_by_name(project_name):
#     response = await fetch_one_project(project_name)
#     if response:
#         return response
#     raise HTTPException(400, "Bad request")


# # CRUD for Projects

# #FIXME not implemented fully
# @app.put("/api/project/", response_model=Project)
# async def put_project(
#     project_name: str,
#     project_location: str,
#     start_date: str,
#     end_date: str,
#     initials: str,
# ):
#     response = await update_project(
#         project_name, project_location, start_date, end_date, initials)
#     if response:
#         return response
#     raise HTTPException(404, f"No project found with the name {project_name}")


# Create Project in the database
@app.post("/api/project/", response_model=ProjectCreate)
async def create_project(project: ProjectCreate):
    try:
        created_project = db_manager.create_project(
            name=project.name,
            start_date=project.start_date,
            end_date=project.end_date,
            location=project.location,
            initials=project.initials,
        )



        project = created_project
        project.ingested_log(stored_initials)
        return project
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# Deletes project from the database
@app.delete("/api/deleteProject/{project_name}")
def delete_project(project_name: str):
    response = db_manager.delete_project(project_name)
    if response:
        return f"Successfully deleted {project_name}"
    raise HTTPException(404, f"No project found with the name {project_name}")


@app.get("/api/events", response_model=List[Event])
async def get_events(project_name: str):
    try:
        events = db_manager.get_events_by_project(project_name)
        return events
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))




@app.patch(
    "/api/createEvent/{project_name}", response_model=EventCreate, status_code=201
)
async def create_event(
    project_name: str,
    event_create: EventCreate = Body(...),
    auto_edges: AutoEdge = Body(...),
):
    print("EventCreate: ", event_create)
    print("AutoEdges: ", auto_edges.auto_edge)
    created_data = event_create.model_dump(exclude_unset=True)
    try:
        print("event add")
        project = db_manager.get_project_representer(project_name)

        created_event = db_manager.add_event_to_project(
            project_name, created_data, auto_edges.auto_edge
        )
        project.add_event_to_project(created_event, stored_initials)

        if created_event:
            return created_event
        # If `add_event_to_project` returns None or False, assume the project was not found
        raise HTTPException(
            status_code=404, detail="Project not found or event creation failed"
        )
    except HTTPException as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

@app.patch("/api/editEvent/{project_name}/{event_id}")
async def edit_event(
    project_name: str, event_id: str, event_update: EventUpdate = Body(...)
):
    updated_data = event_update.model_dump(exclude_unset=True)
    try:
        # Call modify_event_from_project from DatabaseManager
        

        print(project_name)
        success = db_manager.modify_event_from_project(
            project_name, event_id, updated_data
        )

        if success:
            project = db_manager.get_project_representer(project_name)
            project.update_event_in_project(event_id, stored_initials)
            return success
        else:
            raise HTTPException(
                status_code=404, detail="Event not found or no changes made"
            )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



@app.delete("/api/deleteEvent/{project_name}/{event_id}")
async def delete_event(project_name: str, event_id: str):
    try:
        project = db_manager.get_project_representer(project_name)
        response = db_manager.remove_event_from_project(project_name, event_id)
        if response:
            project.delete_event_from_project(event_id, stored_initials)
            return f"Successfully deleted event with ID: {event_id} from project: {project_name}"
        else:
            raise HTTPException(
                404, f"No event found with ID: {event_id} in project: {project_name}"
            )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/{project_name}/graphs", response_model=ProjectGraphs)
async def get_project_graphs(project_name: str):
    try:
        graph_data = db_manager.fetch_project_graph(project_name) 
        project_graphs = ProjectGraphs(graphs=graph_data)
        return project_graphs

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# @app.get("/api/{project_name}/graphs", response_model=Graph)
# async def get_project_graphs(project_name: str):
#     try:
#         project = db_manager.get_project_representer(project_name)

#     except Exception as e:
#         raise HTTPException(detail=str(e))
#     if not project:
#         return {"error_message": f"Invalid project name: {project_name}"}
#     return db_manager.update_project_graph(project)


@app.get(
    "/api/project/{project_name}/icon-libraries", response_model=IconLibraryResponse
)
async def get_project_icon_libraries(project_name: str):
    try:
        response = db_manager.get_icon_library_from_project(project_name)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/project/{project_name}/create-toa")
async def create_toa(project_name: str, data: Dict[str, Union[str, bool, str]]):
    try:
        print("uydsss")
        team = data["team"]
        action_title = data["actionTitle"]
        image_name = data["imageName"]

        # Save the icon to the icon library
        db_manager.add_icon_to_icon_library(
            project_name, team, action_title, image_name
        )

        #log TOA creation 
        initials = stored_initials
    except Exception as e:
        return {"error_message": f"Error ocurred: {e}"}
    else:
        userActivityLogger.create_toa_log(initials= initials, timestamp=datetime.now(), toa_name=action_title)
        return {"message": f"TOA has been created succesfully by {initials}"}

@app.delete("/api/project/{project_name}/delete-icon")
async def delete_icon(project_name: str, team: str, iconName: str):
    initials = stored_initials
    try:
        response = db_manager.delete_icon(project_name, team, iconName)
        if response:
            userActivityLogger.delete_toa_log(initials =initials, timestamp=datetime.now(), iconName=iconName)
            return f"Successfully deleted icon"
        raise HTTPException(404, f"No icon found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
# WORKING
@app.post("/api/project/{project_name}/edit-toa")
async def edit_toa(project_name: str, data: Dict[str, Union[str, bool, str]]):
    try:
        team = data["team"]
        action_title = data["actionTitle"]
        image_name = data["imageName"]
        is_default = data["isDefault"]
        old_team = data["oldTeam"]
        old_action_title = data["oldActionTitle"]
        old_image_name = data["oldImageName"]
        old_is_default = data["oldIsDefault"]

        # Check which new data fields match the corresponding old data fields and set them to None
        if team == old_team:
            team = None
        if action_title == old_action_title:
            action_title = None
        if image_name == old_image_name:
            image_name = None
        if is_default == old_is_default:
            is_default = None

        db_manager.edit_icon(
            project_name,
            old_team,
            old_action_title,
            team,
            action_title,
            image_name,
            is_default,
        )

        initials = stored_initials
    except Exception as e:
      return {"error_message": f"Error ocurred: {e}"}
    else: 
        userActivityLogger.modify_toa_log(initials=initials,timestamp=datetime.now(),toa_name= action_title)
        return {"messsage": f"TOA has been modified succesfully by {initials}"}


@app.post("/api/undo/{project_id}")
async def undo(project_id: str):
    """
    Endpoint to undo the last action on a given project.
    """
    print("recieved pid:", project_id)
    try:
        success = db_manager.undo_last_action(project_id)
        print("success status:", success)
        if success:
            return {"message": "Undo successful"}
        else:
            raise HTTPException(status_code=404, detail="No actions to undo")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/redo/{project_id}")
async def redo(project_id: str):
    """
    Endpoint to redo the previously undone action on a given project.
    """
    try:
        success = db_manager.redo_last_undone_action(project_id)
        if success:
            return {"message": "Redo successful"}
        else:
            raise HTTPException(status_code=404, detail="No actions to redo")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/userActivityLog")
def get_user_activity_logs():
    """
    This API Endpoint allows the frontend to get the User Activity List from the database
    """
    try:
        logs = userActivityLogger.get_log_list()
        log_data = []
        for log in logs:
            log_data.append(
                {
                    "initials": log.initials,
                    "timestamp": log.timestamp,
                    "statement": log.statement,
                }
            )
        return log_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/userActivityLog")
async def add_user_activity_log_entry(timestamp: str, log_entry: str):
    """
    This API call allows the frontend to add a User Log to the Activity List
    """
    try:
        initials = stored_initials
        userActivityLogger.add_user_activity_log(
            initials=initials, timestamp=timestamp, statement=log_entry
        )
        return {"message": "Log entry added successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ------------------------------------------------------------
@app.post("/insert_analyst_initials")
def insert_analyst_initials(initials: str):
    # analyst_collection.insert_one({"initials": initials})
    return {"message": "Analyst initials added successfully"}


@app.delete("/delete_analyst_initials")
def delete_analyst_initials(initials: str):
    # analyst_collection.delete_one({"initials": initials})
    return {"message": "Analyst initials deleted successfully"}


@app.put("/update_analyst_initials")
def update_analyst_initials(initials: str, new_initials: str):
    # analyst_collection.update_one(
    # {"initials": initials}, {"$set": {"initials": new_initials}}
    # )
    return {"message": "Analyst initials updated successfully"}


@app.get("/get_all_analyst_initials/")
def get_analyst_initials():
    initials_list = []
    # for initials in analyst_collection.find():
    # initials_list.append(initials["initials"])
    return {"analyst_initials": initials_list}


localhost = socket.gethostbyname(socket.gethostname())
if __name__ == "__main__":
    uvicorn.run(
        "main:app", host=localhost, port=8000, log_level="debug"
    )  # Run the app using uvicorn as the server with debug logging
    # host and port can be specified as arguments to uvicorn.run if needed (default is localhost:8000)


# ---------- OTHER HTTP METHODS ---------------- #
# @app.get()
"""
The GET method requests a representation of the specified resource. Requests using GET should only retrieve data.
"""
# @app.post()
"""
The POST method is used to submit an entity to the specified resource, often causing a change in state or side effects on the server.
"""
# @app.put()
"""
The PUT method replaces all current representations of the target resource with the request payload.
"""
# @app.options() # option
"""
The OPTIONS method describes the communication options for the target resource.
"""
# @app.head()
"""
The HEAD method asks for a response identical to that of a GET request, but without the response body.
"""
# @app.patch()
"""
The PATCH method is used to apply partial modifications to a resource.
"""
# @app.trace()
"""
The TRACE method performs a message loop-back test along the path to the target resource.
"""

# RUN COMMANDS FOR MAC
# brew services restart mongodb-community
# cd ~backend/ python main.py
# uvicorn main:app --reload


# RUNNABLE COMMANDS
# uvicorn main:app --reload

# brew services start mongodb-community
# brew services restart mongodb-community
# brew services stop mongodb-community

# ---------- HTTP STATUS CODES ---------------- #
# 200 OK
# 201 Created
# 202 Accepted
# 204 No Content
# 301 Moved Permanently
# 302 Found
# 303 See Other
# 304 Not Modified
# 307 Temporary Redirect
# 400 Bad Request
# 401 Unauthorized
# 403 Forbidden
# 404 Not Found
# 405 Method Not Allowed
# 406 Not Acceptable
# 408 Request Timeout
# 415 Unsupported Media Type
# 429 Too Many Requests
# 500 Internal Server Error
# 501 Not Implemented
# 503 Service Unavailable
# 504 Gateway Timeout
# 505 HTTP Version Not Supported
# 511 Network Authentication Required
