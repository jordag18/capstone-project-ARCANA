from fastapi import FastAPI, HTTPException
from database_manager import DatabaseManager
from fastapi.middleware.cors import (
    CORSMiddleware,
)  # CORS = Cross Origin Resource Sharing
from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional
from pymongo import MongoClient
from model import Project
#from log_ingestor import LogIngestor
from typing import List
import uvicorn
from pydantic import BaseModel



# app object
app = FastAPI()
#client = MongoClient("mongodb://localhost:27017/")
#b = client["ARCANA"]
db_manager = DatabaseManager(db_name="ARCANA")

class Event(BaseModel):
    location: str
    initials: str
    team: str
    vector_id: str
    description: str
    data_source: str
    action_title: str
    last_modified: datetime
    # 
    #icon: Optional[str] = None
    source_host: Optional[str] = None
    target_host_list: List[str] = []
    posture: Optional[str] = None
    timestamp: datetime
    is_malformed: bool

class Project(BaseModel):  # Define your project model for API validation
    name: str
    start_date: datetime
    end_date: datetime
    location: str 
    initials: str 
    events: List[Event] = []

class ProjectCreate(BaseModel):
    name: str
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    location: str = ""
    initials: str = ""

from database import (
    fetch_one_project,
    fetch_all_projects,
    create_project,
    update_project,
    remove_project,
)

#collection = db.list_collection_names()
#print(f"{collection}")

# analyst_collection = db["analyst_initials"]
# print(analyst_collection)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"message": "Welcome to ARCANA APIII"}

class IngestPayload(BaseModel):
    files: List[str]

@app.post("/api/ingestLogs", response_model=dict)
async def ingest_logs(payload: IngestPayload):
    for file_name in payload.files:
        print(f"File Name: {file_name}")

    # Return a response indicating success if needed
    return {"message": "Logs ingested successfully"}


@app.get("/api/projects", response_model=List[Project])
async def get_all_projects():
    try:
        projects = db_manager.get_all_projects()
        return projects
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
#FIXME not implemented fully
@app.get("/api/project{project_name}", response_model=Project)
async def get_project_by_name(project_name):
    response = await fetch_one_project(project_name)
    if response:
        return response
    raise HTTPException(400, "Bad request")


# CRUD for Projects

#FIXME not implemented fully
@app.put("/api/project/", response_model=Project)
async def put_project(
    project_name: str,
    project_location: str,
    start_date: str,
    end_date: str,
    initials: str,
):
    response = await update_project(
        project_name, project_location, start_date, end_date, initials)
    if response:
        return response
    raise HTTPException(404, f"No project found with the name {project_name}")


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


@app.delete("/api/deleteProject/{project_name}")
def delete_project(project_name: str):
    response = db_manager.delete_project(project_name)
    if response:
        return f"Successfully deleted {project_name}"
    raise HTTPException(404, f"No project found with the name {project_name}")


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
    uvicorn.run("main:app", host="0.0.0.0", port=5001, log_level="debug")


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
