import datetime
from FileHandler import FileHandler
from data_services import create_event_representer


class LogIngestor:
    def __init__(self, eventsManager):
        # Initialize the LogIngestor with an EventsManager
        self.eventsManager = eventsManager

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
        fileHandler = FileHandler()
        csv_reader = fileHandler.readCSV(fileName)
        for row in csv_reader:
            try:
                # create eventrepresenter
                event = create_event_representer(
                    initials=row['initials'],
                    team=row['team'],
                    vector_id=row['vectorId'],
                    description=row['description'],
                    data_source=fileName,
                    icon=None,
                    action_title="Attack",
                    source_host=row['sourceHost'],
                    target_host_list=row["targetHost"].split(','),
                    location=row['location'],
                    posture=None,
                    timestamp=datetime.datetime.now()
                )

            except csv_reader.Error as e:
                # If it failed to parse
                event.isMalformed = True

            # Add event to EventList with EventManager
            self.eventsManager.addEvent(event)
