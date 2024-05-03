from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
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

class EventGraph(BaseModel):
    id: str
    initials: str
    team: str
    icon: str
    vector_id: str
    description: str
    data_source: str
    action_title: str
    last_modified: str  # or datetime if you parse the string to datetime object
    source_host: Optional[str]
    target_host_list: List[str]
    location: str
    posture: Optional[str]
    timestamp: str  # or datetime
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
    source_host: Optional[str] = None
    target_host_list: List[str] = []
    posture: Optional[str] = ""
    icon: str


class EventCreate(BaseModel):
    id: Optional[str] = ""
    team: str
    action_title: Optional[str] = ""
    data_source: Optional[str] = ""
    initials: str
    location: Optional[str] = ""
    posture: Optional[str] = ""
    source_host: Optional[str] = ""
    target_host_list: List[str] = []
    timestamp: Optional[datetime] = None
    vector_id: Optional[str] = ""
    icon: str
    is_malformed: Optional[bool] = None
    description: str


class Project(BaseModel):
    id: str
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
    events: Dict[str, List[EventGraph]]  # Mapping of event ID to list of event info
    edges: Dict[str, List[str]]         # Mapping of event ID to list of connected event IDs
    last_event: str
    last_red: Optional[str] = None  # Allow None for last_red
    unconnected_blues: List[Any]       # Adjust the type as needed based on actual data

class ProjectGraphs(BaseModel):
    graphs: Dict[str, Graph]  


class Icon(BaseModel):
    image: str
    isDefault: bool


class IconLibraryResponse(BaseModel):
    blue: Dict[str, Icon]
    red: Dict[str, Icon]
    white: Dict[str, Icon]


class AutoEdge(BaseModel):
    auto_edge: bool

class InitialsData(BaseModel):
    initials: str
