import event_representer as event_representer
from event_list import EventList
import json
from typing import List, Any
from collections import defaultdict
from collections.abc import Mapping
from event_representer import EventRepresenter



class EventsManager:

    def __init__(self):
        self.event_representer_list = EventList()

    def load_events(self):
        # Assuming you want to pull all documents from the EventRepresenter collection
        return list(event_representer.objects.all())
    
    def save_events(self, filename):
        #save events to a JSON file
        with open(filename, 'w') as file:
            json.dump(self.events, file, indent=4)

    def create_event(self, event_data):
        #Create a new event
        events = self.load_events() #load existing data
        events.append(event_data) #new event
        self.save_events(events)
    
    def update_event(self, event_id, updated_data):
        #update an existing event
        events = self.load_events()
        for event in events:
            if event['id'] == event_id:
                event.update(updated_data)
                break
            self.save_events(events) #save udpdated events

    def delete_event(self, event_id):
        #delete an event by id
        events = self.load_events()
        events = [event for event in events if event['id']] #filter out event to be deleted
        self.save_events(events)

    def edit_event(self, event_id, updated_data):
        events = self.load_events()
        for event in events:
            if event['id'] == event_id:
                event.update(updated_data)
                break
            self.save_events(events) #save updated events
    
    def get_event(self, event_id):
        #retrieve an event by id
        events = self.load_events()
        for event in events:
            if event['id']==event_id:
                return event
            return None
    
    def get_all_events(self):
        #retrieve all events
        return self.events
    
    @staticmethod
    def group_events_by(
        events: List[EventRepresenter], attr: str
    ) -> Mapping[Any, List[EventRepresenter]]:
        groups = defaultdict(list)
        for event in events:
            groups[getattr(event, attr)].append(event)
        return groups
    
    @staticmethod
    def sort_events_by(
        events: List[EventRepresenter], attr: str
    ) -> List[EventRepresenter]:
        return sorted(events, key=lambda obj: getattr(obj, attr))

    @staticmethod
    def group_events_by_bool(
        events: List[EventRepresenter], attr: str
    ) -> tuple[List[EventRepresenter], List[EventRepresenter]]:
        true_events = [event for event in events if getattr(event, attr)]
        false_events = [event for event in events if not getattr(event, attr)]
        return true_events, false_events





