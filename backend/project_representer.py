from log_ingestor import LogIngestor
from event_representer import EventRepresenter
from events_manager import EventsManager
from user_activity_logger import UserActivityLogger
import datetime
from typing import List, Optional
from mongoengine import Document, StringField, ListField, DateTimeField, ReferenceField, EmbeddedDocumentField


##########################################################################################
#
#
#
#
#
##########################################################################################

#TODO Create functions to make a project representer, save project representer to database, make project representer with ingested logs and save representer.

class ProjectRepresenter(Document):
    
    name = StringField(required=True)
    start_date = DateTimeField(default=datetime.datetime.now)
    end_date = DateTimeField(default=datetime.datetime.now)
    location = StringField(default="")
    initials = StringField(default="")
    event_list = ListField(EmbeddedDocumentField(EventRepresenter), default = [])

    meta = {
        'collection': 'Projects',  # Specifies the collection name in MongoDB
        'ordering': ['-timestamp']  # Documents will be ordered by timestamp descending by default
    }

    def __init__(self, *args, **values):
        super(ProjectRepresenter, self).__init__(*args, **values)
        self.event_manager = EventsManager()
        self.ingestLogsToProject("uploads")

    def ingestLogsToProject(self, directory):
        log_ingestor = LogIngestor(directory, self.event_manager)
        log_ingestor.ingest_logs()
    
        # Log activity when logs are ingested

        timestamp = datetime.datetime.now()
        print("timestamp", timestamp)
        statement = f"HardcodedFileName ingested log in Project {self.name}"  # Adjust statement
        UserActivityLogger.add_user_activity_log(self.initials, timestamp, statement, directory)
        
        for event in self.event_manager.event_representer_list.events:
            #event.save() removed as it returns an empty array of events
            self.event_list.append(event)
        self.save()


    def get_event_representers_info(self):
        # Retrieve all information about each EventRepresenter within the project's event_list
        event_representers_info = []
        for event in self.event_list:
            event_info = {
                'location': event.location,
                'initials': event.initials,
                'team': event.team,
                'vector_id': event.vector_id,
                'description': event.description,
                'data_source': event.data_source,
                'action_title': event.action_title,
                'last_modified': event.last_modified,
                'icon': event.icon,
                'source_host': event.source_host,
                'target_host_list': event.target_host_list,
                'posture': event.posture,
                'timestamp': event.timestamp,
                'is_malformed': event.is_malformed
            }
            event_representers_info.append(event_info)
        return event_representers_info
    
    def group_events_by(self, attrs: List[str]) -> List[List[EventRepresenter]]:
            # If no attribute is passed, all events are returned in a group
            if len(attrs) == 0:
                return [self.event_list]

            output_list = EventsManager.group_events_by(self.event_list, attrs[0]).values()

            for group_by in attrs[1:]:
                input_list = output_list
                output_list = []
                for group in input_list:
                    output_list.extend(
                        EventsManager.group_events_by(group, group_by).values()
                    )

            return output_list
    

        
