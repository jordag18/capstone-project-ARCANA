import EventRepresenter as EventRepresenter
from EventList import EventList

class EventsManager:
    '''def __init__(self):
        # Initialize EventList
        self.eventList = EventList()
'''
    def __init__(self):
        self.event_representer_list = EventList()

    def load_events(self):
        # Assuming you want to pull all documents from the EventRepresenter collection
        return list(EventRepresenter.objects.all())
