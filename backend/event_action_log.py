from mongoengine import Document, StringField, ReferenceField, EmbeddedDocumentField, DateTimeField
import datetime
from event_representer import EventRepresenter
from project_representer import ProjectRepresenter  # Import your existing classes

class EventActionLog(Document):
    action_type = StringField(required=True, choices=('create', 'update', 'delete'))
    event_before = EmbeddedDocumentField(EventRepresenter)  # State of the event before the action
    event_after = EmbeddedDocumentField(EventRepresenter)  # State of the event after the action
    project = ReferenceField(ProjectRepresenter)  # Reference to the project
    performed_at = DateTimeField(default=datetime.datetime.now)  # Timestamp of when the action was performed
    

    meta = {
        'collection': 'EventActionLogs',  # Specifies the collection name in MongoDB
        'ordering': ['-performed_at']  # Logs will be ordered by the time they were performed
    }
