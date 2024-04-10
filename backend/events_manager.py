import event_representer as event_representer
from event_list import EventList
import json
from user_activity_logger import UserActivityLogger
from datetime import datetime


class EventsManager:

    def __init__(self):
        self.event_representer_list = EventList()

    def load_events(self):
        # Assuming you want to pull all documents from the EventRepresenter collection
        return list(event_representer.objects.all())
    
    def save_event(self, filename):
        #save events to a JSON file
        with open(filename, 'w') as file:
            json.dump(self.events, file, indent=4)

    def create_event(self, event_data):
        #Create a new event
        events = self.load_events() #load existing data
        events.append(event_data) #new event
        self.save_events(events)

        #log activity
        
        statement = f"Event '{event_data['id']}' created"
        UserActivityLogger.add_user_activity_log('system', datetime.now(), statement)
    
    def update_event(self, event_id, updated_data):
        #update an existing event
        events = self.load_events()
        for event in events:
            if event['id'] == event_id:
                event.update(updated_data)
                break
            self.save_events(events) #save udpdated events

        #log activity
        statement = f"Event '{event_id}' updated"
        UserActivityLogger.add_user_activity_log('system', datetime.now(), statement)

    def delete_event(self, event_id):
        #delete an event by id
        events = self.load_events()
        events = [event for event in events if event['id']] #filter out event to be deleted
        self.save_events(events)

        #log activity
        statement = f"Event '{event_id}' deleted"
        UserActivityLogger.add_user_activity_log('system', datetime.now(), statement)

    def edit_event(self, event_id, updated_data):
        events = self.load_events()
        for event in events:
            if event['id'] == event_id:
                event.update(updated_data)
                break
            self.save_events(events) #save updated events

        #log activity
        statement = f"Event '{event_id}' edited"
        UserActivityLogger.add_user_activity_log('system', datetime.now(), statement)
    
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
    




