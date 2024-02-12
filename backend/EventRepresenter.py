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

    source_host = StringField(default="")
    target_host_list = ListField(StringField(default=""), default="")
    location = StringField(default="")
    posture = StringField(default="")
    timestamp = DateTimeField(default=datetime.datetime.now)
    is_malformed = BooleanField(default="")
