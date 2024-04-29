import datetime
from mongoengine import (
    Document,
    StringField,
    ListField,
    DateTimeField,
    BooleanField,
    ImageField,
    EmbeddedDocument,
    ObjectIdField,
)
from bson import ObjectId
from typing import Any
from collections.abc import Mapping


class EventRepresenter(EmbeddedDocument):
    id = ObjectIdField(
        primary_key=True, default=ObjectId
    )  # Set id as a part of the class
    initials = StringField(required=True, min_length=2, max_length=2)
    team = StringField(required=True)
    vector_id = StringField(default="")
    description = StringField(required=True)
    data_source = StringField(default="")
    icon = StringField(required=True)
    action_title = StringField(default="")
    last_modified = DateTimeField(default=datetime.datetime.now)
    source_host = StringField(default="")
    target_host_list = ListField(StringField(default=""), default=list)
    location = StringField(default="")
    posture = StringField(default="")
    timestamp = DateTimeField(default=datetime.datetime.now)
    is_malformed = BooleanField(default=False)

    meta = {
        "collection": "Events",  # Specifies the collection name in MongoDB
        "indexes": [
            "vector_id",  # Create an index on the vector_id field
            ("team", "timestamp"),  # Compound index on team and timestamp
        ],
        "ordering": [
            "-timestamp"
        ],  # Documents will be ordered by timestamp descending by default
    }

    def __init__(self, *args, **values):
        super(EventRepresenter, self).__init__(*args, **values)
        self.id = str(self.id)

    def get_id(self):
        """
        Returns the string representation of the ObjectId id field.
        """
        return str(self.id)

    def get_event_info(self) -> Mapping[str, Any]:
        return {
            "id": self.get_id(),
            "initials": self.initials,
            "team": self.team,
            "icon": self.icon,
            "vector_id": self.vector_id,
            "description": self.description,
            "data_source": self.data_source,
            "action_title": self.action_title,
            "last_modified": self.last_modified,
            "source_host": self.source_host,
            "target_host_list": self.target_host_list,
            "location": self.location,
            "posture": self.posture,
            "timestamp": self.timestamp,
            "is_malformed": self.is_malformed,
        }

    def update_event(self, updated_data: Mapping[str, str]) -> None:
        for key, value in updated_data.items():
            if key in [
                "initials",
                "team",
                "vector_id",
                "description",
                "action_title",
                "source_host",
                "location",
                "posture",
                "timestamp",
                "icon",
            ]:
                setattr(self, key, value)
            elif key in ["data_source", "last_modified"]:
                setattr(
                    self, key, datetime.datetime.strptime(value, "%Y-%m-%d %H:%M:%S")
                )
            elif key in ["target_host_list"]:
                setattr(self, key, value.split(","))
            elif key in ["is_malformed"]:
                setattr(self, key, bool(value))
            else:
                print(
                    f"Key ({key}) doesn't match any {self.__class__.__name__} attributes."
                )
        # self.save() doesnt exist

    def __str__(self):
        return (
            f"EventRepresenter(id={self.id}, initials={self.initials}, team={self.team}, vector_id={self.vector_id}, "
            f"description={self.description}, data_source={self.data_source}, action_title={self.action_title}, "
            f"last_modified={self.last_modified}, source_host={self.source_host}, "
            f"target_host_list={self.target_host_list}, location={self.location}, posture={self.posture}, "
            f"timestamp={self.timestamp}, is_malformed={self.is_malformed})"
        )
