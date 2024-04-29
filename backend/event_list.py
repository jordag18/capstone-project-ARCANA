from event_representer import EventRepresenter


class EventList:
    def __init__(self):
        self.events = list()

    def refresh(self):
        """Refresh the list of events from the database."""
        self.events = list(EventRepresenter.objects.all())

    def addEvent(self, event):
        # Add the given EventRepresenter to the list
        self.events.append(event)
