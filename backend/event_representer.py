import datetime
from mongoengine import Document, StringField, ListField, DateTimeField, BooleanField,ImageField, EmbeddedDocument

##########################################################################################
#
#
#
#
#
##########################################################################################


class EventRepresenter(EmbeddedDocument):
    initials = StringField(required=True, min_length=2, max_length=2)
    team = StringField(required=True)
    vector_id = StringField(required=True)
    description = StringField(required=True)
    data_source = StringField(required=True)
    icon = ImageField()
    action_title = StringField(required=True)
    last_modified = DateTimeField(default=datetime.datetime.now)
    source_host = StringField(default="")
    target_host_list = ListField(StringField(default=""), default=list)
    location = StringField(default="")
    posture = StringField(default="")
    timestamp = DateTimeField(default=datetime.datetime.now)
    is_malformed = BooleanField(default=False)

    meta = {
        'collection': 'Events',  # Specifies the collection name in MongoDB
        'indexes': [
            'vector_id',  # Create an index on the vector_id field
            ('team', 'timestamp'),  # Compound index on team and timestamp
        ],
        'ordering': ['-timestamp']  # Documents will be ordered by timestamp descending by default
    }

    def __init__(self, *args, **values):
        super(EventRepresenter, self).__init__(*args, **values)

    def __str__(self):
        return f"EventRepresenter(initials={self.initials}, team={self.team}, vector_id={self.vector_id}, " \
               f"description={self.description}, data_source={self.data_source}, action_title={self.action_title}, " \
               f"last_modified={self.last_modified}, source_host={self.source_host}, " \
               f"target_host_list={self.target_host_list}, location={self.location}, posture={self.posture}, " \
               f"timestamp={self.timestamp}, is_malformed={self.is_malformed})"
