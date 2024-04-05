#Diana Castaneda CRUD
from project_list import ProjectList
from project_representer import ProjectRepresenter
from user_activity_logger import UserActivityLogger
from datetime import datetime
import json

##########################################################################################
#
#
#
#
#
##########################################################################################

class ProjectManager:
    def __init__(self):
        self.project_representer_list = []
        #self.user_activity_logger = UserActivityLogger()

    def create_project(self, name, start_date=None, end_date=None, location="", initials=""):
        # Create a new ProjectRepresenter instance
        start_date = start_date or datetime.now()
        end_date = end_date or datetime.now()
        new_project = ProjectRepresenter(name=name, start_date=start_date, end_date=end_date, location=location, initials=initials)
        new_project.save()  # Save the new project to the database
        self.project_representer_list.append(new_project)  # Add the new project to the projects list
        
        # Create an activity log for project creation
        timestamp = datetime.now()
        statement = f"Project '{name}' created"
        UserActivityLogger.add_user_activity_log(initials, timestamp, statement)
        return new_project

    def get_project_by_name(self, name):
        # Find a project by name
        for project in self.project_representer_list:
            if project['name'] == name:
                return project
        return None

    def list_projects(self):
        # List all projects
        return self.project_representer_list

    def ingest_logs_to_project(self, directory, project_name):
        # Ingest logs to a specified project
        project = self.get_project_by_name(project_name)
        if project:
            project.ingestLogsToProject(directory)

        else:
            print(f"Project with name {project_name} not found.")
    
    def save_projects(self, filename):
        #save projects to json file
        data = [project.to_json() for project in self.project_representer_list]
        with open(filename,  'w') as file:
            json.dump(data, file, indent=4)

    def update_project(self, name, updated_data):
        #update project information
        project = self.get_project_by_name(name)
        if project:
            for key, value in updated_data.items():
                if key in project._fields:
                    project[key] = value
            project.save()
            return project
        return None

    def remove_project(self, project_name, initials=""):
        for project in self.project_representer_list:
            if project['name'] == project_name:
                self.project_representer_list.remove(project)

                # Create an activity log for project removal
                timestamp = datetime.now()
                statement = f"Project '{project_name}' removed"
                UserActivityLogger.add_user_activity_log(initials, timestamp, statement)
                return True  # Project removed successfully
        return False  # Project removal failed


    
    

    