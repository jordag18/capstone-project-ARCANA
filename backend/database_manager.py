#Diana Castaneda CRUD
import datetime
from mongoengine import connect
from project_representer import ProjectRepresenter
from event_representer import EventRepresenter
from projects_manager import ProjectManager
from events_manager import EventsManager

class DatabaseManager:
    def __init__(self, db_name, host='localhost', port=27017):
        # Establish a connection to the MongoDB database
        connect(db_name, host=host, port=port)
        self.project_manager = ProjectManager()

    def create_project(self, name, start_date=None, end_date=None, location="", initials=""):
        # Create and save a new project
        return self.project_manager.create_project(name, start_date, end_date, location, initials)

    def delete_project(self, project_name):
        # Delete a project by name
        project = ProjectRepresenter.objects(name=project_name).first()
        if project:
            project.delete()  # This deletes the project from the database
            return True
        return False
    
    def open_project(self, project_name):
        # open project by name
        project = ProjectRepresenter.objects(name=project_name).first()
        if project:
            project_info = {
                'name': project.name,
                'start_date': project.start_date,
                'end_date': project.end_date,
                'location': project.location,
                'initials': project.initials,
                # Add any other project attributes you need
            }
            return project_info
        return False

    def save_project(self, project):
        # Save changes to an existing project
        project.save()

    def get_project(self, project_name):
        # Retrieve a project by name
        return self.project_manager.get_project_by_name(project_name)

    def add_event_to_project(self, project_name, event_data):
        # Add an event to a specific project
        project = self.get_project(project_name)
        if project:
            new_event = EventRepresenter(**event_data)
            new_event.save()  # Save the new event to the database
            project.event_list.append(new_event)
            project.save()  # Save the updated project
            return new_event
        return None

    def remove_event_from_project(self, project_name, event_id):
        # Remove an event from a specific project
        project = self.get_project(project_name)
        if project:
            # Filter out the event to be removed
            project.event_list = [event for event in project.event_list if str(event.id) != event_id]
            project.save()  # Save the updated project
            return True
        return False

    def get_all_projects(self):
        # Retrieve all projects
        projects = list(ProjectRepresenter.objects.all())  # Fetch all project documents from MongoDB
        all_projects_info = []  # List to hold information of all projects

        # Iterate through each project and collect necessary information
        for project in projects:
            project_info = {
                'name': project.name,
                'start_date': project.start_date,
                'end_date': project.end_date,
                'location': project.location,
                'initials': project.initials,
                # Add any other project attributes you need
            }

            # If you need to include event details from each project's event list
            event_representers_info = []
            for event in project.event_list:
                event_info = {
                    'location': event.location,
                    'initials': event.initials,
                    'team': event.team,
                    'vector_id': event.vector_id,
                    'description': event.description,
                    'data_source': event.data_source,
                    'action_title': event.action_title,
                    'last_modified': event.last_modified,
                    'icon': event.icon,  # Note: Adjust if needed to handle image fields correctly
                    'source_host': event.source_host,
                    'target_host_list': event.target_host_list,
                    'posture': event.posture,
                    'timestamp': event.timestamp,
                    'is_malformed': event.is_malformed
                }
                event_representers_info.append(event_info)
            
            # Add the list of events to the project's information
            project_info['events'] = event_representers_info

            # Append the detailed project information to the all_projects_info list
            all_projects_info.append(project_info)
            self.project_manager.project_representer_list = all_projects_info

        return all_projects_info

    def get_all_events(self):
        # Retrieve all events
        return list(EventRepresenter.objects.all())
    
    def create_event(self, event_data):
        #create and save a new event
        new_event = EventRepresenter(**event_data)
        new_event.save()
        return new_event
    def delete_event(self, event_id):
        #delete an event by ID
        event = EventRepresenter.objects(id=event_id).first()
        if event:
            event.delete()
            return True
        return False
    def update_event(self, event_id,updated_data):
        event = EventRepresenter.objects(id=event_id).first()
        for key, value in updated_data.items():
            event.save()
            return event
        return None 

    

