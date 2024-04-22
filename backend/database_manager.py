#Diana Castaneda CRUD
#Daniel Lucio Project CRUD
import copy
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

    def delete_project(self, project_id):
        # Delete a project by name
        project = ProjectRepresenter.objects(id=project_id).first()
        if project:
            project.delete()  # This deletes the project from the database
            self.project_manager.delete_project(project_id, project.initials)
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

    def add_event_to_project(self, project_id, event_data):
        # Add an event to a specific project
        project = ProjectRepresenter.objects(id=project_id).first()
        if project:
            new_event = EventRepresenter(**event_data)
            print(new_event)

            self.log_action(
                project_id=str(project.id),
                action_type="create",
                event_after=new_event,
                event_before= None
            )

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

    def remove_event_from_project(self, project_id, event_id):
        try:
            event_id_obj = ObjectId(event_id)
            # First fetch the event to log it before deletion
            project = ProjectRepresenter.objects(id=project_id).first()
            if not project:
                print("Project not found")
                return False

            # Find the event to be removed
            event_to_remove = None
            for event in project.event_list:
                if str(event.id) == str(event_id_obj):
                    event_to_remove = copy.deepcopy(event)
                    break

            if not event_to_remove:
                print("Event not found")
                return False

            # Perform the removal
            update_result = project.update(pull__event_list__id=event_id_obj)
            if update_result == 0:
                print("Failed to remove the event")
                return False
            
            # Log the removal
            self.log_action(
                project_id=str(project.id),
                action_type="delete",
                event_before=event_to_remove,
                event_after=None,
            )


            return True
        except Exception as e:
            print("An error occurred:", e)
            return False
        
    def modify_event_from_project(self, project_id, event_id, updated_data):
        try:
            event_id_obj = ObjectId(event_id)
        except ValidationError:
            print("Invalid event ID format")
            return False

        try:
            project = ProjectRepresenter.objects(id=project_id).first()
            if not project:
                print("Project not found")
                return False

            event_found = False
            for index, event in enumerate(project.event_list):
                if str(event.id) == str(event_id_obj):
                    # Deep copy the event before updates to capture the 'before' state
                    event_before_update = copy.deepcopy(event)

                    # Update the event with new data
                    for key, value in updated_data.items():
                        setattr(event, key, value)
                    
                    project.save()  # Save the updated project
                    
                    # Log the action with before and after states
                    self.log_action(
                        project_id=str(project.id),
                        action_type="update",
                        event_before=event_before_update,
                        event_after=copy.deepcopy(event), # Deep copy after updates to capture the 'after' state
                    )

                    event_found = True
                    print("Event updated successfully")
                    break

            if not event_found:
                print("Event not found in the project")
                return False

            return True
        except Exception as e:
            print("An error occurred:", str(e))
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

    
    def get_icon_library_from_project(self, project_id):
        try:
            project = ProjectRepresenter.objects(id=project_id).first()
            if project:
                return project.toa_icon_library

            else:
                print(f"Project with id '{project_id}' not found.")
                return None
        except Exception as e:
            print("An error occurred while retrieving the icon library from the database:", e)
            return None
        
    def add_icon_to_icon_library(self, project_id: str, team: str, action_title: str, icon_filename: str) -> None:
        project = ProjectRepresenter.objects(id=project_id).first()
        if project:
            project.add_toa_icon(team, action_title, icon_filename)
        else:
            print("didn't work")
    
    def edit_icon(self, project_id: str, old_team: str, old_action_title: str, new_team: str, new_action_title: str, new_icon_filename: str, new_is_default: bool):
        project = ProjectRepresenter.objects(id=project_id).first()
        if project:
            project.edit_toa_icon(old_team, old_action_title, new_team, new_action_title, new_icon_filename, new_is_default)
        else:
            print("didn't work")
    
    #category = team (color), name = action title
    def delete_icon(self, project_id: str, category: str, name: str):
        project = ProjectRepresenter.objects(id=project_id).first()
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
            print(f"Project with id '{project_id}' not found.")
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
            last_action = EventActionLog.objects(project=project_oid, is_undone=False).order_by('-performed_at').first()
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
                    if (event.id == last_action.event_after.id) :
                        project.event_list[index] = last_action.event_before
                        break
            elif last_action.action_type == 'delete':
                project.event_list.append(last_action.event_before)

            project.save()  # Save the project with updated event list
            last_action.update(set__is_undone=True) #Sets the undone action is_undone flag to be true
            return True

        except DoesNotExist:
            print("ActionLog or Project does not exist.")
            return False
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return False

    

    def redo_last_undone_action(self, project_id):
        try:
            project_oid = ObjectId(project_id)
        except ValidationError:
            print("Invalid project ID format")
            return False

        try:
            # Fetch the most recent undone action for the given project
            last_undone_action = EventActionLog.objects(project=project_oid, is_undone=True).order_by('+performed_at').first()
            if not last_undone_action:
                print("No undone actions to redo")
                return False
            print(f"Found ActionLog to redo: {last_undone_action}")

            # Fetch the project
            project = ProjectRepresenter.objects(id=project_oid).first()
            if not project:
                print("Project not found")
                return False

            # Redo the action based on its type
            if last_undone_action.action_type == 'create':
                project.event_list.append(last_undone_action.event_after)  # Re-add the event that was removed
            elif last_undone_action.action_type == 'update':
                # Replace the event with its updated version
                for index, event in enumerate(project.event_list):
                    if event.id == last_undone_action.event_after.id:
                        project.event_list[index] = last_undone_action.event_after
                        break
            elif last_undone_action.action_type == 'delete':
                # Remove the event that was re-added
                project.event_list = [event for event in project.event_list if event.id != last_undone_action.event_before.id]

            project.save()  # Save the project with the re-applied event list
            # Update the action log to mark it as no longer undone
            last_undone_action.update(set__is_undone=False)
            print("Redo action applied successfully")
            return True

        except DoesNotExist:
            print("ActionLog or Project does not exist.")
            return False
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return False
        
    
    def log_action(self, project_id, action_type, event_before, event_after):
        try:
            project_oid = ObjectId(project_id)
            project = ProjectRepresenter.objects(id=project_oid).first()
            if not project:
                print("Project not found")
                return False

            # Create and save new action log
            new_log = EventActionLog(
                action_type=action_type,
                event_before=event_before,
                event_after=event_after,
                project=project,
            )
            new_log.save()

            # Maintain only the 5 most recent actions: find and remove extra entries
            all_logs = EventActionLog.objects(project=project_oid).order_by('-performed_at')
            if all_logs.count() > 5:
                # Get IDs of logs to delete
                logs_to_delete = all_logs[5:]
                for log in logs_to_delete:
                    log.delete()

            return True
        except Exception as e:
            print(f"An error occurred while logging action: {str(e)}")
            return False


    def update_project_graph(self, project):
        project_graph = GraphManager.get_project_graphs(project)
        project.project_graph = project_graph
        project.save()

        return project_graph