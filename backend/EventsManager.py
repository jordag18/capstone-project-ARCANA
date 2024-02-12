
import EventRepresenter as EventRepresenter
import EventList as EventList

class EventsManager:
    def __init__(self):
        # Initialize EventList
        self.eventList = EventList()

    def addEvent(self, event):
        # Add the EventRepresenter to the EventList
        self.eventList.addEvent(event)

