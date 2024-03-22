#Diana Castaneda
import event_representer as event_representer
from event_list import EventList
import json

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
    def save_events(self, filename):
        '''save events to a JSON file'''
        with open(filename, 'w') as file:
            json.dump(self.events, file, indent=4)

    def create_event(self, event_data):
        '''Create a new event'''
        self.events.append(event_data)
    
    def update_event(self, event_id, updated_data):
        '''update an existing event'''
        for event in self.events:
            if event['id'] == event_id:
                event.update(updated_data)

    def delete_event(self, event_id):
        '''delete an event by id'''
        self.events = [event for event in self.events if event['id'] != event_id]
    
    def get_event(self, event_id):
        '''retrieve an event by id'''
        for event in self.events:
            if event['id']==event_id:
                return event
            return None
    
    def get_all_events(self):
        '''retrieve all events'''
        return self.events
    




