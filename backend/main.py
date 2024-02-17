from fastapi import File, FastAPI, HTTPException, UploadFile
from fastapi.middleware.cors import (
    CORSMiddleware,
)  # CORS = Cross Origin Resource Sharing
from pymongo import MongoClient
from model import Project
#from log_ingestor import LogIngestor
from typing import List



# app object
app = FastAPI()
client = MongoClient("mongodb://localhost:27017/")
db = client["ARCANA"]


from database import (
    fetch_one_project,
    fetch_all_projects,
    create_project,
    update_project,
    remove_project,
)

collection = db.list_collection_names()
print(f"{collection}")

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
    return {"message": "Welcome to ARCANA API"}


@app.get("/api/project")
async def get_project():
    # Code to retrieve all projects from the database
    response = await fetch_all_projects()
    return response


@app.get("/api/project{project_name}", response_model=Project)
async def get_project_by_name(project_name):
    response = await fetch_one_project(project_name)
    if response:
        return response
    raise HTTPException(400, "Bad request")


# CRUD for Projects
@app.post("/api/project", response_model=Project)
async def post_project(project:Project):
    # Code to add a new project to the database
    response = await create_project(project.dict())
    if response:
        return response
    raise HTTPException(400, "Bad request")


@app.put("/api/project{project_name}/", response_model=Project)
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


@app.delete("/api/deleteProject{project_name}")
async def delete_project(project_name):
    response = await remove_project(project_name)
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
