import csv
from mongoengine import Document, StringField, DateTimeField


class UserActivityLogger(Document):
    initials = StringField(required=True),
    timestamp = DateTimeField(required=True),
    statement = StringField(required=True,default="Default Log Entry"),
    data_source = StringField(default="")

    meta = {
        'collection': 'UserActivityLogs', 
        'ordering': ['-timestamp']  
    } 

    def add_user_activity_log(self,initials, timestamp, statement, data_source=None):
        try:
            #checks if initials and timestamp are provided
            if not initials or not timestamp:
                raise ValueError("Initials and timestamp are required")
            #construct log entry with optional data source
            if data_source:
                log_entry = {
                    'initials': initials,
                    'timestamp':timestamp,
                    'statement':statement,
                    'data_source':data_source
                }
            else:
                log_entry = {
                    'initials': initials,
                    'timestamp':timestamp,
                    'statement':statement,
                }
            self.user_activity_log_list.append(log_entry)
            self.save()
            print(self.user_activity_log_list)

        except ValueError as e:
            print(f"Error adding user activity log: {e}")

    @classmethod
    def get_log_data(cls):
        # returns a list of user activity logs.
        return cls.user_activity_log_list

    @classmethod
    def export_user_activity_logs(cls, filename):
        try: 
            #export user activity logs to a csv file
            with open(filename, 'w', newline='') as csvfile:
                writer = csv.writer(csvfile)
                writer.writerow(["Initials", "Timestamp", "Statement"])
                for log_entry in cls.user_activity_log_list:
                    #Parse log entry and write to csv
                    initials, timestamp, statement = cls.parse_log_entry(log_entry)
                    writer.writerow([initials, timestamp, statement])
            print(f"User activity logs exported to {filename} successfully.")
        except Exception as e:
            print(f"Error exporting user activity logs: {e}")

    @staticmethod
    def parse_log_entry(log_entry):
        #Parse log entry to extract initials, timestap, and statement
        parts = log_entry.split('] [', 1)
        initials = parts[0][1:]
        timestamp, statement = parts[1].split(']',1)
        return initials, timestamp, statement
    
    #Nested class for user actions
    class USER:
        def __init__(self, user_activity_logger):
            self.user_activity_logger = user_activity_logger
        
        #ProjectManager
        def create_project(self, initials, timestamp):
            self.user_activity_logger.add_user_activity_log(initials,timestamp, "Project created")

        def delete_project(self, initials, timestamp):
            self.user_activity_logger.add_user_activity_log(initials,timestamp, "Project deleted")

        def save_project(self, initials, timestamp):
            self.user_activity_logger.add_user_activity_log(initials,timestamp, "Project saved")
        
        def update_project(self, initials, timestamp):
            self.user_activity_logger.add_user_activity_log(initials, timestamp, "Project Updated")
        
        #LogIngestor
        def ingest_logs(self, initials, timestamp):
            self.user_activity_logger.add_user_activity_log(initials,timestamp, "Logs ingested")

        #EventManager
        def create_event(self, initials, timestamp):
            self.user_activity_logger.add_user_activity_log(initials,timestamp, "Event Created")
        
        def save_event(self, initials, timestamp):
            self.user_activity_logger.add_user_activity_log(initials, timestamp, "Event saved")

        def delete_event(self, initials, timestamp):
            self.user_activity_logger.add_user_activity_log(initials,timestamp, "Event deleted")

        def edit_event(self, initials, timestamp):
            self.user_activity_logger.add_user_activity_log(initials,timestamp, "Event edited")
        
        #EventGraph
        def export_event(self, initials, timestamp):
            self.user_activity_logger.add_user_activity_log(initials,timestamp, "Event exported")

        def import_event(self, initials, timestamp):
            self.user_activity_logger.add_user_activity_log(initials,timestamp, "Event imported")
