import event_representer as event_representer
from event_list import EventList

class EventsManager:
    '''def __init__(self):
        # Initialize EventList
        self.eventList = EventList()
'''
    def __init__(self):
        self.event_representer_list = EventList()

    def load_events(self):
        # Assuming you want to pull all documents from the EventRepresenter collection
        return list(event_representer.objects.all())
