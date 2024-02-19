import datetime
from mongoengine import Document, StringField, ListField, DateTimeField, BooleanField,ImageField


class EventRepresenter(Document):
    initials = StringField(required=True, min_length=2, max_length=2)
    team = StringField(required=True)
    vector_id = StringField(required=True)
    description = StringField(required=True)
    data_source = StringField(required=True)
    icon = ImageField()
    action_title = StringField(required=True)
    last_modified = DateTimeField(default=datetime.datetime.now)
    source_host = StringField(default="")
    target_host_list = ListField(StringField(default=""), default="")
    location = StringField(default="")
    posture = StringField(default="")
    timestamp = DateTimeField(default=datetime.datetime.now)
    is_malformed = BooleanField(default="")

    def get_initials(self):
        return self.initials

    def set_initials(self, value):
        self.initials = value

    def get_team(self):
        return self.team

    def set_team(self, value):
        self.team = value

    def get_vector_id(self):
        return self.vector_id

    def set_vector_id(self, value):
        self.vector_id = value

    def get_description(self):
        return self.description

    def set_description(self, value):
        self.description = value

    def get_data_source(self):
        return self.data_source

    def set_data_source(self, value):
        self.data_source = value

    def get_icon(self):
        return self.icon

    def set_icon(self, value):
        self.icon = value

    def get_action_title(self):
        return self.action_title

    def set_action_title(self, value):
        self.action_title = value

    def get_last_modified(self):
        return self.last_modified

    def set_last_modified(self, value):
        self.last_modified = value

    def get_source_host(self):
        return self.source_host

    def set_source_host(self, value):
        self.source_host = value

    def get_target_host_list(self):
        return self.target_host_list

    def set_target_host_list(self, value):
        self.target_host_list = value

    def get_location(self):
        return self.location

    def set_location(self, value):
        self.location = value

    def get_posture(self):
        return self.posture

    def set_posture(self, value):
        self.posture = value

    def get_timestamp(self):
        return self.timestamp

    def set_timestamp(self, value):
        self.timestamp = value

    def get_is_malformed(self):
        return self.is_malformed

    def set_is_malformed(self, value):
        self.is_malformed = value
    