import FileHandler as FileHandler
import EventRepresenter as EventRepresenter
from datetime import datetime
import csv

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
        with open(fileName, 'r') as file:
            reader = csv.DictReader(file)
            try:
                for row in reader:
                    dateCreated = datetime.strptime(row['dateCreated'], "%m/%d/%Y %H:%M:%S")
                    description = row['description']
                    sourceHost = row['sourceHost'] if row['sourceHost'] else None
                    targetHostList = row['targetHost'].split(',') if row['targetHost'] else []
                    team = row['team']
                    location = row['location']
                    initials = row['initials']
                    vectorID = row['vectorId']
                    dataSource = fileName
                    lastModified = datetime.strptime(row['lastModified'], "%m/%d/%Y %H:%M:%S")
                    actionTitle =  None
                    icon = None
                    posture = None
                    isMalformed = False
                    event = EventRepresenter.EventRepresenter(initials, team, vectorID, description, dataSource, 
                                                            icon, lastModified, actionTitle, sourceHost, targetHostList, location, posture, dateCreated,
                                                            isMalformed)
            except Exception as e:
                    # If it failed to parse
                    event.isMalformed = True
                    print("wrong")
            self.eventsManager.addEvent(event)