from fastapi import Body, FastAPI, HTTPException, UploadFile, File
from database_manager import DatabaseManager
from fastapi.middleware.cors import (
    CORSMiddleware,
)  # CORS = Cross Origin Resource Sharing
from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional
from pymongo import MongoClient
from model import *
#from log_ingestor import LogIngestor
from typing import List
import uvicorn
from pydantic import BaseModel
from file_handler import FileHandler
from graph import GraphManager



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
#client = MongoClient("mongodb://localhost:27017/")
#b = client["ARCANA"]
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
#Ingest logs API
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
#Retrieves all projects in DB
@app.get("/api/projects", response_model=List[Project])
async def get_all_projects():
    try:
        projects = db_manager.get_all_projects()
        return projects
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

#Create Project in the database
@app.post("/api/project/", response_model=ProjectCreate)
async def create_project(project: ProjectCreate):
    try:
        created_project = db_manager.create_project(
            name=project.name,
            start_date=project.start_date,
            end_date=project.end_date,
            location=project.location,
            initials=project.initials
        )
        return created_project
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

#Deletes project from the database
@app.delete("/api/deleteProject/{project_name}")
def delete_project(project_name: str):
    response = db_manager.delete_project(project_name)
    if response:
        return f"Successfully deleted {project_name}"
    raise HTTPException(404, f"No project found with the name {project_name}")

@app.patch("/api/editEvent/{project_name}/{event_id}")
async def edit_event(project_name: str, event_id: str, event_update: EventUpdate = Body(...)):
    updated_data = event_update.model_dump(exclude_unset=True)
    try:
        # Call modify_event_from_project from DatabaseManager
        success = db_manager.modify_event_from_project(project_name, event_id, updated_data)
        if success:
            return success
        else:
            raise HTTPException(status_code=404, detail="Event not found or no changes made")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/events", response_model=List[Event])
async def get_events(project_name: str):
    try:
        events = db_manager.get_events_by_project(project_name)
        return events
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.patch("/api/createEvent/{project_name}", response_model=EventCreate, status_code=201)
async def create_event(project_name: str, event_create: EventCreate = Body(...)):
    created_data = event_create.model_dump(exclude_unset=True)
    try:
        created_event = db_manager.add_event_to_project(project_name, created_data)
        if created_event:
            return created_event
        # If `add_event_to_project` returns None or False, assume the project was not found
        raise HTTPException(status_code=404, detail="Project not found or event creation failed")
    except HTTPException as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

@app.delete("/api/deleteEvent/{project_name}/{event_id}")
async def delete_event(project_name: str, event_id: str):
    print(project_name, event_id)
    try:
        response = db_manager.remove_event_from_project(project_name, event_id)
        if response:
            return f"Successfully deleted event with ID: {event_id} from project: {project_name}"
        else:
            raise HTTPException(404, f"No event found with ID: {event_id} in project: {project_name}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/{project_name}/graphs", response_model=Graph)
async def get_project_graphs(project_name: str):
    try:
        project = db_manager.get_project_representer(project_name)

    except Exception as e:
        raise HTTPException(detail=str(e))
    if not project:
        return {"error_message": f"Invalid project name: {project_name}"}
    return GraphManager.get_project_graphs(project)


# ------------------------------------------------------------
@app.post("/insert_analyst_initials")
def insert_analyst_initials(initials: str):
    #analyst_collection.insert_one({"initials": initials})
    return {"message": "Analyst initials added successfully"}


@app.delete("/delete_analyst_initials")
def delete_analyst_initials(initials: str):
    #analyst_collection.delete_one({"initials": initials})
    return {"message": "Analyst initials deleted successfully"}


@app.put("/update_analyst_initials")
def update_analyst_initials(initials: str, new_initials: str):
    #analyst_collection.update_one(
        #{"initials": initials}, {"$set": {"initials": new_initials}}
    #)
    return {"message": "Analyst initials updated successfully"}


@app.get("/get_all_analyst_initials/")
def get_analyst_initials():
    initials_list = []
    #for initials in analyst_collection.find():
        #initials_list.append(initials["initials"])
    return {"analyst_initials": initials_list}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=5005, log_level="debug")


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

