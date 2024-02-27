import sys
from mongoengine import connect
from data_services import create_event_representer
from LogIngestor import LogIngestor
from EventsManager import EventsManager
from ProjectsManager import ProjectManager
from ProjectRepresenter import ProjectRepresenter


# Connect to MongoDB
connect('ARCANA', host='localhost', port=27017)

test_project_manager = ProjectManager()
test_project = test_project_manager.create_project(name="DaProject")
test_project.ingestLogsToProject("pdrr")


