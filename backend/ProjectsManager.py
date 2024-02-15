from ProjectList import ProjectList
class ProjectsManager:
    def __init__(self):
        self.projectList = ProjectList()

    def addProject(self, project):
        self.projectList.addProject(project)
    

    