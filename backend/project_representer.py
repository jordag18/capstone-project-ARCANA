from log_ingestor import LogIngestor
from event_representer import EventRepresenter
from events_manager import EventsManager
import datetime
from mongoengine import Document, StringField, ListField, DateTimeField, ReferenceField

#TODO Create functions to make a project representer, save project representer to database, make project representer with ingested logs and save representer.

class ProjectRepresenter(Document):
    
    name = StringField(required=True)
    start_date = DateTimeField(default=datetime.datetime.now)
    end_date = DateTimeField(default=datetime.datetime.now)
    location = StringField(default="")
    initials = StringField(default="")
    event_list = ListField(ReferenceField(EventRepresenter), default = [])

    meta = {
        'collection': 'Projects',  # Specifies the collection name in MongoDB
        'ordering': ['-timestamp']  # Documents will be ordered by timestamp descending by default
    }

    def __init__(self, *args, **values):
        super(ProjectRepresenter, self).__init__(*args, **values)
        self.event_manager = EventsManager()

    def ingestLogsToProject(self, directory):
        log_ingestor = LogIngestor(directory, self.event_manager)
        log_ingestor.ingestLogs()
        for event in self.event_manager.event_representer_list.events:
            event.save()
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
    

        
