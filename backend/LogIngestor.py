import FileHandler as FileHandler
import EventRepresenter as EventRepresenter
import EventsManager as EventsManager
from datetime import datetime
import csv
from backend.DatabaseManager import create_event_representer


class LogIngestor:
    def __init__(self):
        # Initialize the LogIngestor with an EventsManager
        #self.eventsManager = eventsManager
        self.eventsManager = EventsManager.EventsManager()

    def ingestLogs(self, fileName):
        fileHandler = FileHandler.FileHandler()
        fileType = fileHandler.getFileType(fileName)
        if fileType == "csv":
            self.parseCSVFile(fileName)
        # elif fileType == "txt":
        #     self.parseTxtFile(fileName)
        # elif fileType == "log":
        #     self.parseLogFile(fileName)
        # else:
        #     print("Unsupported file type:", fileType)

    def parseCSVFile(self, fileName):
        with open(fileName, 'r') as file:
            reader = csv.DictReader(file)
            try:
                for row in reader:
                    event = create_event_representer(
                        initials=row['initials'],
                        team=row['team'],
                        vector_id=row['vectorId'],
                        description=row['description'],
                        data_source=fileName,
                        icon=None,
                        action_title=None,
                        last_modified=datetime.strptime(row['lastModified'], "%m/%d/%Y %H:%M:%S"),
                        source_host=row['sourceHost'],
                        target_host_list=row["targetHost"].split(','),
                        location=row['location'],
                        posture=None,
                        timestamp=datetime.strptime(row['dateCreated'], "%m/%d/%Y %H:%M:%S"),
                        is_malformed=False
                    )

            except Exception as e:
                    # If it failed to parse
                    event.isMalformed = True
                    print("wrong")
            self.eventsManager.addEvent(event)