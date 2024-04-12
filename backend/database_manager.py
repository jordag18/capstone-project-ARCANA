#Diana Castaneda CRUD
#Daniel Lucio Project CRUD
import datetime
from mongoengine import connect
from project_representer import ProjectRepresenter
from event_representer import EventRepresenter
from projects_manager import ProjectManager
from events_manager import EventsManager
from bson import ObjectId
import pymongo

##########################################################################################
#
#
#
#
#
##########################################################################################

class DatabaseManager:
    def __init__(self, db_name, host='localhost', port=27017):
        # Establish a connection to the MongoDB database
        connect(db_name, host=host, port=port)
        self.project_manager = ProjectManager()
        # Establish a connection to the MongoDB database using pymongo
        self.client = pymongo.MongoClient(f"mongodb://{host}:{port}/")
        self.db = self.client[db_name]
        self.projects_collection = self.db["Projects"]

        # Initialize ProjectManager
        self.project_manager = ProjectManager()

    def create_project(self, name, start_date=None, end_date=None, location="", initials=""):
        # Create and save a new project
        return self.project_manager.create_project(name, start_date, end_date, location, initials)

    def delete_project(self, project_name):
        # Delete a project by name
        project = ProjectRepresenter.objects(name=project_name).first()
        if project:
            project.delete()  # This deletes the project from the database
            self.project_manager.remove_project(project_name, project.initials)
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


    def get_events_by_project(self, project_name):
        project = self.get_project(project_name)
        if project:
            return project.get('events')
        return []
    
    def save_project(self, project):
        # Save changes to an existing project
        project.save()

    def get_project(self, project_name):
        # Retrieve a project by name
        return self.project_manager.get_project_by_name(project_name)

    def get_project_representer(self, project_name):
        return ProjectRepresenter.objects(name=project_name).first()

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
    
    def create_event_to_project(self, project_name, event_data):
        try:
            new_event = EventRepresenter(id=ObjectId(), **event_data)
            new_event.save()

            result = self.projects_collection.update_one(
                {"name": project_name},
                {"$push": {"event_list": new_event.id}}
            )
            if result.modified_count == 1:
                return True
            else:
                return False
        except Exception as e:
            return False

    def remove_event_from_project(self, project_name, event_id):
        try:
            event_id_obj = ObjectId(event_id)
            # Update the project in the database to remove the event
            self.projects_collection.update_one({"name": project_name}, {"$pull": {"event_list": {"_id": event_id_obj}}})
            project = self.get_project(project_name)
            if project:
                project['events'] = [event for event in project['events'] if event.get('id') != event_id]
            return True
        except Exception as e:
            print("An error occurred:", e)
            return False
        
    def modify_event_from_project(self, project_name, event_id, updated_data):
        try:
            event_id_obj = ObjectId(event_id)
            # Prepare the update operation
            update_operation = {
                "$set": {
                    # For each key-value pair in updated_data, create an update expression
                    # This assumes event_list is an array of embedded documents (sub-documents) within the project document
                    f"event_list.$[elem].{key}": value for key, value in updated_data.items()
                }
            }
            # Specify the arrayFilters to identify the specific event to update within the event_list array
            array_filters = [
                {"elem._id": event_id_obj}  # Identifies the correct event in the event_list array by _id
            ]
            # Perform the update operation
            result = self.projects_collection.update_one(
                {"name": project_name},  # Filter to identify the correct project document
                update_operation,
                array_filters=array_filters  # Apply the arrayFilters
            )
            if result.matched_count == 0:
                print("No matching project found")
                return False
            if result.modified_count == 0:
                print("No modifications were made")
                return False
            return True
        except Exception as e:
            print("An error occurred when modifying the event:", e)
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
                    'id': event.id,
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
    
    def delete_event(self, event_id):
        #delete an event by ID
        event = EventRepresenter.objects(id=event_id).first()
        if event:
            event.delete()
            return True
        return False
    
    def get_icon_library_from_project(self, project_name):
        try:
            project = ProjectRepresenter.objects(name=project_name).first()
            if project:
                return project.toa_icon_library

            else:
                print(f"Project with name '{project_name}' not found.")
                return None
        except Exception as e:
            print("An error occurred while retrieving the icon library from the database:", e)
            return None
        
    def add_icon_to_icon_library(self, project_name: str, team: str, action_title: str, icon_filename: str) -> None:
        project = ProjectRepresenter.objects(name=project_name).first()
        if project:
            project.add_toa_icon(team, action_title, icon_filename)
        else:
            print("didn't work")
    
    def delete_icon(self, project_name: str, category: str, name: str):
        project = ProjectRepresenter.objects(name=project_name).first()
        if project:
            try:
                icon_library = project.toa_icon_library
                if category in icon_library and name in icon_library[category]:
                    # Delete the icon from the icon library
                    del icon_library[category][name]
                    project.save()

                    # Iterate over each event in the project's event list
                    events = project.event_list
                    for event in events:
                        # Check if the event's action title and team match the deleted icon
                        if event.action_title == name and event.category == category:
                            # Wanna make it so the replacement icon is the default ones
                            #replacement_action_title = f"{category.lower()} Team Activity"
                            #replacement_icon = f"{replacement_action_title.lower().replace(' ', '-')}"
                            print("needs replacement")
                            # Update the event's action title and icon with replacement values
                            #event.action_title = replacement_action_title
                            #event.icon = replacement_icon

                    return True
                else:
                    print(f"Icon '{name}' in category '{category}' not found in the icon library.")
                    return False
            except Exception as e:
                print("An error occurred while deleting the icon from the icon library:", e)
                return False
        else:
            print(f"Project with name '{project_name}' not found.")
            return False
    