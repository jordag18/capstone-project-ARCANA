from pydantic import BaseModel
from typing import List, Optional, Dict
from datetime import datetime
from collections.abc import Mapping


class Project(BaseModel):
    project_name:str
    project_location:str
    start_date:str
    end_date:str
    initials:str

class Event(BaseModel):
    initials:str
    team:str
    vector_id:str
    description:str
    data_source:str
    icon:str
    action_title:str
    last_modified:str
    source_host:str
    target_host_list:str
    location:str
    posture:str
    timestamp:str
    is_malformed:str

class Graph(BaseModel):
    roots: List[str]
    graph: Mapping[str, list]
    malformed_key: str = ""