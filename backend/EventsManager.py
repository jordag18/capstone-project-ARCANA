import EventRepresenter as EventRepresenter
from EventList import EventList

class EventsManager:
    def __init__(self):
        # Initialize EventList
        self.eventList = EventList()

    def addEvent(self, event):
        # Add the EventRepresenter to the EventList
        self.eventList.addEvent(event)
