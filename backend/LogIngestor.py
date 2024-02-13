from FileHandler import FileHandler
from EventRepresenter import EventRepresenter
from datetime import datetime
from PIL import Image
import csv

class LogIngestor:
    def __init__(self, directory):
        self.directory = directory
        self.errors = []
        self.newFilesIngested = []

    def ingestLogs(self, log_folder):
        fileHandler = FileHandler()
        self.newFilesIngested = fileHandler.get_log_paths(log_folder)
        for filepath in self.newFilesIngested:
            if filepath.endswith(".csv"):
                if 'red' in filepath:
                    self.parseRedCSVFile(filepath)
                elif 'white' in filepath:
                    self.parseWhiteCSVFile(filepath)
            # elif fileType == "txt":
            #     self.parseTxtFile(fileName)
            # elif fileType == "log":
            #     self.parseLogFile(fileName)
            # else:
            #     print("Unsupported file type:", fileType)

  
    def parseRedCSVFile(self,fileName):
        try:
            with open(fileName,'r') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    if row['source address'].startswith('*'): continue
                    timestamp = row['timestamp']
                    source_address = row['source address']
                    target_address = row['destination address'].split(',') if row['destination address'] else []
                    actions = row['actions']
                    description = row['comments']
        except Exception as e:
            self.errors.append(e)
                
    def parseWhiteCSVFile(self,fileName):
        try:
            with open(fileName, 'r') as file:
                reader = csv.DictReader(file)
                try:
                    for row in reader:
                        event = EventRepresenter
                        isMalformed = False #9
                        #fields in csv file, present in table 3.2.2 - 8 #1-8
                        initials = row['initials']
                        team = row['team']
                        sourceHost = row['sourceHost']
                        targetHostList = row['targetHost'].split(',') if row['targetHost'] else []
                        location = row['location']
                        posture = None #not in csv file
                        description = row['description']
                        vectorID = row['vectorId']
                        dataSource = fileName #9
                        
                        dateCreated = datetime.strptime(row['dateCreated'], "%m/%d/%Y %H:%M:%S")
                        lastModified = datetime.strptime(row['lastModified'], "%m/%d/%Y %H:%M:%S")
                        
                        match(team):
                            case "Blue":
                                icon = Image.open("Icons/BlueTeam_Activity.png")
                                actionTitle = "Blue Team Activity"
                            case "Red":
                                icon = Image.open('Icons/RedTeam_Activity.png')
                                actionTitle = "Red Team Activity"
                            case "White",_:
                                icon = Image.open("Icons/WhitCard.png")
                                actionTitle = "White Card"
                                
                        fields = [dateCreated,description,dataSource,targetHostList,team,
                                    location,initials , vectorID,lastModified]
                        #check if the file has all the attributes
                        for field in fields:
                            if field == " ":
                                isMalformed = True
                                break
                      
                        event = EventRepresenter(initials, team, vectorID, description, dataSource, 
                                                                icon, lastModified, actionTitle, sourceHost, targetHostList, location, posture, dateCreated,
                                                                isMalformed) 
                        self.eventsManager.addEvent(event)
                except Exception as e:
                        # if any erros occur  while parsing event mark as malformed
                        self.errors.append(e)
                        event.isMalformed = True
        except Exception as e:
            self.errors.append(e)