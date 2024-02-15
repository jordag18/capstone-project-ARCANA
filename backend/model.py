from pydantic import BaseModel


class Project(BaseModel):
    project_name:str
    project_location:str
    start_date:str
    end_date:str
    initials:str
