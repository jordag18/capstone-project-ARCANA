from LogIngestor import LogIngestor
from EventRepresenter import EventRepresenter
from EventsManager import EventsManager
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
        
