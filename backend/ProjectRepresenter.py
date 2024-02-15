from LogIngestor import LogIngestor
class ProjectRepresenter:
    def __init__(self, directory):
        self.directory = directory
        self.logIngestor = LogIngestor.LogIngestor(directory)

    def ingestLogsToProject(self):
        self.logIngestor.ingestLogs()
        
