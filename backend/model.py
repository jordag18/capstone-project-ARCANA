from pydantic import BaseModel
from typing import List, Optional, Dict
from datetime import datetime
from collections.abc import Mapping


class Event(BaseModel):
    id: str
    location: str
    initials: str
    team: str
    vector_id: str
    description: str
    data_source: str
    action_title: str
    last_modified: datetime
    icon: str
    source_host: Optional[str] = None
    target_host_list: List[str] = []
    posture: Optional[str] = None
    timestamp: datetime
    is_malformed: bool

class EventUpdate(BaseModel):
    location: Optional[str] = None
    initials: Optional[str] = None
    team: Optional[str] = None
    vector_id: Optional[str] = None
    description: Optional[str] = None
    data_source: Optional[str] = None
    action_title: Optional[str] = None
    timestamp: Optional[datetime] = None
    is_malformed: Optional[bool] = None

class EventCreate(BaseModel):
    team: Optional[str] = ""
    action_title: Optional[str] = ""
    data_source: Optional[str] = ""
    initials: Optional[str] = ""
    location: Optional[str] = ""
    posture: Optional[str] = ""
    source_host: Optional[str] = ""
    target_host_list: List[str] = []
    timestamp: Optional[datetime] = None
    vector_id: Optional[str] = ""
    icon: Optional[str] = ""
    is_malformed: Optional[bool] = None
    description: Optional[str] = ""

class Project(BaseModel): 
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

class Graph(BaseModel):
    roots: List[str]
    graph: Mapping[str, list]
    malformed_key: str = ""

class Icon(BaseModel):
    image: str
    isDefault: bool


class IconLibraryResponse(BaseModel):
    blue: Dict[str, Icon]
    red: Dict[str, Icon]
    white: Dict[str, Icon]