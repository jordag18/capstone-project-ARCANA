#Diana Castaneda CRUD
#Daniel Lucio Project CRUD
import datetime
from mongoengine import connect
from mongoengine.errors import ValidationError, DoesNotExist
from project_representer import ProjectRepresenter
from event_representer import EventRepresenter
from projects_manager import ProjectManager
from event_action_log import EventActionLog
from bson import ObjectId
from graph import GraphManager
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
        self.userLogs_collection = self.db["UserActivityLogs"]
        
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
            self.project_manager.delete_project(project_name, project.initials)
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

    def get_project_representer(self, project_name) -> ProjectRepresenter:
        return ProjectRepresenter.objects(name=project_name).first()

    def add_event_to_project(self, project, event_data):
        # Add an event to a specific project
        if project:
            new_event = EventRepresenter(**event_data)
            print(new_event)

            EventActionLog(
                action_type='create',
                event_after=new_event,
                project=project,
            ).save()
            return new_event
        return None
    
    def create_event_to_project(self, project, event_data):
        try:
            new_event = EventRepresenter(id=ObjectId(), **event_data)
            new_event.save()

            result = self.projects_collection.update_one(
                {"name": project.name},
                {"$push": {"event_list": new_event.id}}
            )
            project.event_list.append(new_event)
            project.save()  # Save the updated project
            if result.modified_count == 1:
                EventActionLog(
                    action_type='create',
                    event_after=new_event,
                    project=project,
                ).save()
                return new_event
            else:
                return None
        except Exception as e:
            return None

    def remove_event_from_project(self, project, event_id):
        try:
            event_id_obj = ObjectId(event_id)
            # Update the project in the database to remove the event
            self.projects_collection.update_one({"name": project.name}, {"$pull": {"event_list": {"_id": event_id_obj}}})
            if project:
                project.event_list = [event for event in project.event_list if event.id != event_id]
            return True
        except Exception as e:
            print("An error occurred:", e)
            return False
        
    def modify_event_from_project(self, project_name, event_id, updated_data):
        try:
            event_id_obj = ObjectId(event_id)

            # First, get the event's current data before updating
            project = self.projects_collection.find_one(
                {"name": project_name, "event_list._id": event_id_obj},
                {"event_list.$": 1}  # This projection returns only the matching event in the event_list
            )

            if not project:
                print("No matching project or event found")
                return False

            # Retrieve the specific event data
            event_before_update = project['event_list'][0] if 'event_list' in project and len(project['event_list']) > 0 else None
            if not event_before_update:
                print("Event not found")
                return False
            
            print("Event before update:", event_before_update)

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
            
                    # Retrieve the updated event data
            project_after_update = self.projects_collection.find_one(
                {"name": project_name, "event_list._id": event_id_obj},
                {"event_list.$": 1}  # Returns only the matching event
            )
            event_after_update = project_after_update['event_list'][0] if 'event_list' in project_after_update and len(project_after_update['event_list']) > 0 else None

            print("Event after update:", event_after_update)

                        # Log the action
            EventActionLog(
                action_type='update',
                event_before=event_before_update,
                event_after=event_after_update,
                project=project,
            ).save()
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
                'id': str(project.id),
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
    
    def edit_icon(self, project_name: str, old_team: str, old_action_title: str, new_team: str, new_action_title: str, new_icon_filename: str, new_is_default: bool):
        project = ProjectRepresenter.objects(name=project_name).first()
        if project:
            project.edit_toa_icon(old_team, old_action_title, new_team, new_action_title, new_icon_filename, new_is_default)
        else:
            print("didn't work")
    
    #category = team (color), name = action title
    def delete_icon(self, project_name: str, category: str, name: str):
        project = ProjectRepresenter.objects(name=project_name).first()
        if project:
            try:
                icon_library = project.toa_icon_library
                if category in icon_library and name in icon_library[category]:
                    # Delete the icon from the icon library
                    del icon_library[category][name]
                    project.save()

                    # Get the default icon for the team category
                    default_icon = None
                    if category in icon_library:
                        for name, icon_info in icon_library[category].items():
                            if icon_info["isDefault"]:
                                default_icon = icon_info["image"]
                                break

                    # Iterate over each event in the project's event list
                    events = project.event_list
                    for event in events:
                        # Check if the event's action title and team match the deleted icon
                        if event.action_title == name and event.team == category:
                            # Update the event's action title and icon with replacement values
                            event.action_title = f"{category.capitalize()} Team Activity"
                            event.icon = default_icon or f"{category.lower().replace(' ', '-')}-team-activity.png"
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

    def undo_last_action(self, project_id):
        try:
            # Convert string project_id to ObjectId and ensure it's valid
            project_oid = ObjectId(project_id)
        except Exception as e:
            print(f"Invalid project ID format: {str(e)}")
            return False

        print(f"Project ID being queried: {project_id}")
        print(f"Converted ObjectId: {project_oid}")
        
        # Fetch the most recent action for the given project
        try:
            last_action = EventActionLog.objects(project=project_oid).order_by('-performed_at').first()
            if not last_action:
                print("No actions to undo")
                return False
            print(f"Found ActionLog: {last_action}")
            
            # Fetch the project
            project = ProjectRepresenter.objects(id=project_oid).first()
            if not project:
                print("Project not found")
                return False

            # Process the undo based on the action type
            if last_action.action_type == 'create':
                project.event_list = [event for event in project.event_list if event.id != last_action.event_after.id]
            elif last_action.action_type == 'update':
                for index, event in enumerate(project.event_list):
                    if event.id == last_action.event_after.id:
                        project.event_list[index] = last_action.event_before
                        break
            elif last_action.action_type == 'delete':
                project.event_list.append(last_action.event_before)

            project.save()  # Save the project with updated event list
            last_action.delete()  # Optionally remove the action log
            return True

        except DoesNotExist:
            print("ActionLog or Project does not exist.")
            return False
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return False

    
    def redo_last_action(project_id):
    # This assumes you have a way to track undone actions. For simplicity, let's fetch the latest undone action.
        last_undone_action = EventActionLog.objects(project=project_id, undone=True).order_by('-performed_at').first()
        if not last_undone_action:
            print("No actions to redo")
            return False

        if last_undone_action.action_type == 'create':
            # Redo a creation
            ProjectRepresenter.objects(id=project_id).update_one(push__event_list=last_undone_action.event_after)
        elif last_undone_action.action_type == 'update':
            # Redo an update
            ProjectRepresenter.objects.filter(id=project_id, event_list__id=last_undone_action.event_before.id).update_one(
                **{'set__event_list__$': last_undone_action.event_after}
            )
        elif last_undone_action.action_type == 'delete':
            # Redo a deletion
            ProjectRepresenter.objects(id=project_id).update_one(pull__event_list=last_undone_action.event_before)

        # Optionally, mark the action as redone
        last_undone_action.update(set__undone=False)
        return True


    def update_project_graph(self, project):
            project_graph = GraphManager.get_project_graphs(project)
            project.project_graph = project_graph
            project.save()

            return project_graph