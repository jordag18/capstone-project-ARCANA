from project_list import ProjectList
from project_representer import ProjectRepresenter
from datetime import datetime

class ProjectManager:
    def __init__(self):
        self.project_representer_list = []

    def create_project(self, name, start_date=None, end_date=None, location="", initials=""):
        # Create a new ProjectRepresenter instance
        start_date = start_date or datetime.now()
        end_date = end_date or datetime.now()
        new_project = ProjectRepresenter(name=name, start_date=start_date, end_date=end_date, location=location, initials=initials)
        new_project.save()  # Save the new project to the database
        self.project_representer_list.append(new_project)  # Add the new project to the projects list
        return new_project

    def get_project_by_name(self, name):
        # Find a project by name
        for project in self.project_representer_list:
            if project.name == name:
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
    


    
    

    