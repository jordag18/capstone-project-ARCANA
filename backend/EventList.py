import mongoengine
from backend.EventRepresenter import EventRepresenter

class EventList(mongoengine.Document):
    def __init__(self):
        # Initialize an empty list of EventRepresenters
        self.events = mongoengine.EmbeddedDocumentListField(EventRepresenter)

    def addEvent(self, event):
        # Add the given EventRepresenter to the list
        self.events.append(event)
