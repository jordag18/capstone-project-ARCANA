import FileHandler as FileHandler
import EventRepresenter as EventRepresenter

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
        csv_reader = fileHandler.readCSV()
        for row in csv_reader:
            try:
                #create eventrepresenter 
                event = EventRepresenter()

                event.initials = row['initials']
                event.team = row['team']
                event.vectorID = row['vectorId']
                event.description = row['description']
                event.dataSource = fileName
                event.icon = None
                event.actionTitle = None 
                event.sourceHost = row['sourceHost'] if row['sourceHost'] else None
                event.targetHostList = row['targetHost'].split(',') if row['targetHost'] else []
                event.location = row['location'] if row['location'] else None
                event.posture =  None
                event.timestamp = None

            except csv_reader.Error as e:
                # If it failed to parse
                event.isMalformed = True

            # Add event to EventList with EventManager
            self.eventsManager.addEvent(event)
