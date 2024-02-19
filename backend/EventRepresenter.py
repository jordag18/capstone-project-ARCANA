import datetime
from mongoengine import Document, StringField, ListField, DateTimeField, BooleanField



class EventRepresenter(Document):
    initials = StringField(required=True, min_length=2, max_length=2)
    team = StringField(required=True)
    vector_id = StringField(required=True)
    description = StringField(required=True)
    data_source = StringField(required=True)
    icon = StringField(default="TO BE IMPLEMENTED")
    action_title = StringField(required=True)
    last_modified = DateTimeField(default=datetime.datetime.now)
    source_host = StringField(default="")
    target_host_list = ListField(StringField(default=""), default="")
    location = StringField(default="")
    posture = StringField(default="")
    timestamp = DateTimeField(default=datetime.datetime.now)
    is_malformed = BooleanField(default="")

    meta = {
        'collection': 'Events',  # Specifies the collection name in MongoDB
        'indexes': [
            'vector_id',  # Create an index on the vector_id field
            ('team', 'timestamp'),  # Compound index on team and timestamp
        ],
        'ordering': ['-timestamp']  # Documents will be ordered by timestamp descending by default
    }
