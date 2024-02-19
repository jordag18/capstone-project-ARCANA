from FileHandler import FileHandler
from EventRepresenter import EventRepresenter
from EventsManager import EventsManager
from datetime import datetime
import csv
from PIL import Image


class LogIngestor:
    def __init__(self, directory):
        self.directory = directory
        self.errors = []
        self.newFilesIngested = []
        self.eventManager = EventsManager()

    def ingestLogs(self):
        fileHandler = FileHandler(self.directory)
        self.newFilesIngested = fileHandler.get_log_paths()
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
                    timestamp = row['Timestamp']
                    source_address = row['source address']
                    target_address = row['destination address'].split(',') if row['destination address'] else []
                    actions = row['actions']
                    description = row['comments']
        except Exception as e:
            print("red csv files error here")
            self.errors.append(e)

    def parse_timestamp(self,timestamp_str):
        if len(timestamp_str.split(':')) < 3: 
            timestamp_str += ':00'
        return datetime.strptime(timestamp_str, "%m/%d/%Y %H:%M:%S")
              
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

                        dateCreated = self.parse_timestamp(row['dateCreated'])
                        lastModified = self.parse_timestamp(row['lastModified'])

                        match(team):
                            case "Blue":
                                icon = ("../Icons/BlueTeam_Activity.png")
                                actionTitle = "Blue Team Activity"
                            case "Red":
                                icon = ('../Icons/RedTeam_Activity.png')
                                actionTitle = "Red Team Activity"
                            case "White":
                                icon = ("../Icons/WhitCard.png")
                                actionTitle = "White Card"

                        fields = [dateCreated,description,dataSource,targetHostList,team,
                                    location,initials , vectorID,lastModified]
                        #check if the file has all the attributes
                        for field in fields:
                            if field == " ":
                                isMalformed = True
                                break

                        event = EventRepresenter(
                            initials=initials,
                            team=team,
                            vector_id=vectorID,
                            description=description,
                            data_source=dataSource,
                            action_title=actionTitle,
                            last_modified=lastModified,
                            source_host=sourceHost,
                            target_host_list=targetHostList,
                            location=location,
                            posture=posture,
                            timestamp=dateCreated,
                            is_malformed=isMalformed
                            
                        )
                        event.icon.replace(open(icon,'rb'),filname="icon")
                        event.save()

                        #print(event.get_initials()) #testing
                    self.eventManager.addEvent(event)
                    #print(self.eventManager.eventList.events) #testing

                except Exception as e:
                        # if any erros occur  while parsing event mark as malformed
                        self.errors.append(e)
                        event.isMalformed = True
        except Exception as e:
            self.errors.append(e)