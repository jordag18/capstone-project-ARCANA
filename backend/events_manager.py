from event_list import EventList
from user_activity_logger import userActivityLogger
from datetime import datetime
from typing import List, Any
from collections import defaultdict
from collections.abc import Mapping
from event_representer import EventRepresenter
from mongoengine import ListField, EmbeddedDocument, ObjectIdField


class EventsManager:

    def __init__(self):
        self.event_representer_list = EventList()

    def load_events(self):
        # Assuming you want to pull all documents from the EventRepresenter collection
        return self.event_representer_list.events

    def save_events(self, updated_list):
        self.event_representer_list.events = updated_list

    def create_event(self, new_event: EventRepresenter):
        # Create a new event
        events = self.load_events()  # load existing data
        events.append(new_event)  # new event
        self.save_events(events)
        return new_event
        # log activity
        # moved these to project representer
        # statement = f"Event '{new_event}' created"
        # UserActivityLogger.add_user_activity_log('system', datetime.now(), statement)

    def delete_event(self, event_id):
        # delete an event by id
        current_events_list = self.load_events()
        if current_events_list:
            new_list = [
                event for event in current_events_list.events if event.id != event_id
            ]
            self.save_events(new_list)
        # log activity
        # statement = f"Event '{event_id}' deleted"
        # UserActivityLogger.add_user_activity_log('system', datetime.now(), statement)

    def edit_event(self, event_id, updated_data):
        events = self.load_events()
        for event in events:
            if event["id"] == event_id:
                event.update(updated_data)
                break
            self.save_events(events)  # save updated events

        # log activity
        statement = f"Event '{event_id}' edited"
        userActivityLogger.add_user_activity_log("system", datetime.now(), statement)

    def get_event(self, event_id):
        # retrieve an event by id
        events = self.load_events()
        for event in events:
            if event["id"] == event_id:
                return event
            return None

    def get_all_events(self):
        # retrieve all events
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
