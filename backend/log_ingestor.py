from file_handler import FileHandler
from data_services import create_event_representer
from events_manager import EventsManager
from datetime import datetime
import csv, os

##########################################################################################
# I feel like this class may be individually important enough to warrant method
# descriptions for each one. Also outline what isn't working for us in the code, not
# litterally but in terms of improvement and make it its own section.
#
# Coded by Luis A. Fierro
##########################################################################################


class LogIngestor:
    """
    Class responsible for Reading Logs and Creating Events from Logs.\n

    Attributes:
        self.directory (str): The directory in which the logs are stored (SIDENOTE: Currently hardcoded to to "uploads").
        event_manager (EventsManager): The Project's EventManager which holds all the events in its EventList.
        newFilesIngested (list): A list containing the names of all log files that where succesfully ingested.
        errors (list): A list containing the errors that occured while ingesting the log files.
    """

    def __init__(self, directory: str, event_manager: EventsManager):
        """
        Class Contructor for LogIngestor\n
        Parameters:
            directory (str): The directory in which the logs are stored (SIDENOTE: Currently hardcoded to to "uploads")
            event_manager (EventsManager): The Project's EventManager which holds all the events in its EventList
        """
        # optiminally we want self.directory to be the Project's folder in the database/local, I will hard code it to be uploads for now
        self.directory = "uploads"
        self.errors = []
        self.newFilesIngested = []
        self.event_manager = event_manager

    def ingest_logs(self):
        """
        Main Method for LogIngestor.\n
        It opens the LogIngestor's directory and uses a FileHandler object to obtain the filepaths of every file that could be a log from that directory.
        It will then determine the file's type and call the appropriate method for that file in order to make events from it.
        After the file is processed or if its an unsupported file type it will be deleted from the directory.
        Once the LogIngestor finishes parsing and deleted every file in the directory it will delete the directory itself.\n
        The supported file types are: .csv, ...
        """
        fileHandler = FileHandler(self.directory)
        files = fileHandler.get_log_paths()
        for filepath in files:
            filetype = fileHandler.get_file_type(filepath)
            if filetype == "csv":
                self._read_csv_file(filepath)
                if filepath not in self.newFilesIngested:
                    self.newFilesIngested.append(filepath)
            else:
                print("Unsupported file type:", filetype)
            fileHandler.delete_file(filepath)
        fileHandler.delete_directory()
        return self.newFilesIngested

    def _read_csv_file(self, filePath: str):
        """
        Method to seperate CSV log files into Red Team Files or White Team Files.\n
        It reads the csv file's headers and sents a csv.DictReader object
        to the main event creation methods based on those headers.\n
        Parameter:
            filePath (str): The filepath of the csv log file.
        """
        try:
            with open(filePath, "r") as file:
                reader = csv.DictReader(file)
                header = reader.fieldnames  # Read the header row as fieldnames
                if "Timestamp" in header and "source address" in header:  # Red Files
                    self._parse_red_csv_file(reader, filePath)
                elif "dateCreated" in header and "description" in header:  # White Files
                    self._parse_white_csv_file(reader, filePath)
        except Exception as error:
            self._handle_error(error)

    def _parse_red_csv_file(self, readRedFile: csv.DictReader, filePath: str):
        """
        Log Parser for Red CSV files. It takes a DictReader that contains the CSV file's infomation.
        It will then take that infomation and create an event for each of its row and
        save that event to the EventManager's EventList class that was passed when the LogIngestor was created.\n
        Parameters:
            readRedFile (DictReader): Parsed infomation of the red csv log file.
            filepath (str): The filepath of the red csv log file.
        """
        try:
            for row in readRedFile:
                if row["source address"].startswith("*"):
                    continue
                timestamp = row["Timestamp"]
                source_address = row["source address"]
                target_address = (
                    row["destination address"].split(",")
                    if row["destination address"]
                    else []
                )
                actions = row["actions"]
                description = row["comments"]
        except Exception as error:
            self._handle_error(error)

    def _parse_white_csv_file(self, readWhiteFile: csv.DictReader, filePath: str):
        """
        Log Parser for White CSV files. It takes a DictReader that contains the CSV file's infomation.
        It will then take that infomation and create an event for each of its row and
        save that event to the EventManager's EventList class that was passed when the LogIngestor was created.\n
        Parameters:
            readWhiteFile (DictReader): Parsed infomation of the white csv log file.
            filepath (str): The filepath of the white csv log file.
        """
        try:
            for row in readWhiteFile:
                is_malformed = False  # 9
                # fields in csv file, present in table 3.2.2 - 8 #1-8
                initials = row["initials"]
                team = row["team"].lower()
                sourceHost = row["sourceHost"]
                targetHostList = (
                    row["targetHost"].split(",") if row["targetHost"] else []
                )
                location = row["location"]
                posture = None  # not in csv file
                description = row["description"]
                vectorID = row["vectorId"]
                icon, actionTitle = self._get_event_icon(team)

                dataSource = filePath  # 9

                dateCreated = self._parse_timestamp(row["dateCreated"])
                lastModified = self._parse_timestamp(row["lastModified"])

                fields = [
                    dateCreated,
                    description,
                    dataSource,
                    targetHostList,
                    team,
                    location,
                    initials,
                    vectorID,
                    lastModified,
                ]

                # check if the file has all the attributes
                for field in fields:
                    if field == " ":
                        is_malformed = True
                        break

                event = create_event_representer(
                    initials=initials,
                    team=team,
                    vector_id=vectorID,
                    description=description,
                    data_source=os.path.basename(dataSource),
                    icon=icon,
                    action_title=actionTitle,
                    last_modified=lastModified,
                    source_host=sourceHost,
                    target_host_list=targetHostList,
                    location=location,
                    posture=posture,
                    timestamp=dateCreated,
                    is_malformed=is_malformed,
                )

                self.event_manager.event_representer_list.addEvent(event)

        except Exception as error:
            self._handle_error(error)

    def _get_event_icon(self, team: str) -> tuple[str, str]:
        """
        Returns the TOA icon png filepath & the action title based on the which team the event corresponds to.\n
        Parameter:
            team (str): The event's corresponding team. (Blue, Red, White)
        Returns:
            icon_path (str): The filepath to the TOA icon png that will be used for events.
            action_title (str): The action title for the event.
        """
        try:
            match team:
                case "blue":
                    # icon library not implemented
                    icon_path = "BlueTeam_Activity.png"
                    action_title = "Blue Team Activity"
                case "red":
                    icon_path = "RedTeam_Activity.png"
                    action_title = "Red Team Activity"
                case "white":
                    icon_path = "Whitecard.png"
                    action_title = "White Card"
                case _:
                    icon_path = "Unknown"
                    action_title = "Unknown"

            return icon_path, action_title
        except Exception as error:
            self._handle_error(error)

    def _handle_error(self, error):
        """
        Handles any errors that occur during the log ingestion process and adds them to the list of errors.\n
        Parameter:
            error: The occur that has occured.
        """
        print("Error:", error)
        self.errors.append(error)

    def _parse_timestamp(self, timestamp: str):
        """
        Utility Helper Method\n
        Formats the timestamp str into the datetime format: %m/%d/%Y %H:%M:%S.
        Ensuring that the timestamp is complete.\n
        Parameter:
            timestamp (str): timestamp string that will be formatted into a datetime.
        Returns:
            datetime: "%m/%d/%Y %H:%M:%S"
        """
        if len(timestamp.split(":")) < 3:
            timestamp += ":00"
        return datetime.strptime(timestamp, "%m/%d/%Y %H:%M:%S")
