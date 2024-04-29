import datetime
from event_representer import EventRepresenter
from typing import List


class Filter:
    # Filters events by user's initials and only returns those events,
    def filter_by_initials(self, event_list, initials):
        matching_events = []
        for event in event_list:
            if event.initials == initials:
                matching_events.append(event)
        return matching_events

    def filter_by_team(self, event_list, team):
        matching_events = []
        for event in event_list:
            if event.team == team:
                matching_events.append(event)
        return matching_events

    def filter_by_source_host(self, event_list, source_host):
        matching_events = []
        for event in event_list:
            if event.source_host == source_host:
                matching_events.append(event)
        return matching_events

    def filter_by_target_host(self, event_list, target_host):
        matching_events = []
        for event in event_list:
            if target_host in event.target_host_list:
                matching_events.append(event)
        return matching_events

    def filter_by_location(self, event_list, location):
        matching_events = []
        for event in event_list:
            if event.location == location:
                matching_events.append(event)
        return matching_events

    def filter_by_location(self, event_list, vector_id):
        matching_events = []
        for event in event_list:
            if event.vector_id == vector_id:
                matching_events.append(event)
        return matching_events

    def filter_by_time_interval(self, event_list, start_time, end_time):
        matching_events = []
        for event in event_list:
            if start_time <= event.timestamp <= end_time:
                matching_events.append(event)
        return matching_events

    def sort_events_by_initials_ascending(self, event_list):
        def sorting_key(event):
            return (event.initials or "zzzzz", event.initials is None)

        sorted_events = sorted(event_list, key=sorting_key)
        return sorted_events

    def sort_events_by_initials_descending(self, event_list):
        def sorting_key(event):
            if event.initials is None:
                return ("", True)
            else:
                return (event.initials, False)

        sorted_events = sorted(event_list, key=sorting_key, reverse=True)
        return sorted_events

    def sort_events_by_team_ascending(self, event_list):
        def sorting_key(event):
            team_order = {"Blue": 0, "Red": 1, "White": 2, "Unknown": 3}
            return team_order.get(event.team, len(team_order)), event.team is None

        sorted_events = sorted(event_list, key=sorting_key)
        return sorted_events

    def sort_events_by_team_descending(self, event_list):
        def sorting_key(event):
            team_order = {"Blue": 2, "Red": 0, "White": 1, "Unknown": 3}
            return team_order.get(event.team, len(team_order)), event.team is None

        sorted_events = sorted(event_list, key=sorting_key)
        return sorted_events

    def sort_events_by_source_host_ascending(self, event_list):
        def sorting_key(event):
            return (event.source_host or "zzzzz", event.source_host is None)

        sorted_events = sorted(event_list, key=sorting_key)
        return sorted_events

    def sort_events_by_source_host_descending(self, event_list):
        def sorting_key(event):
            if event.source_host is None:
                return ("", True)
            else:
                return (event.source_host, False)

        sorted_events = sorted(event_list, key=sorting_key, reverse=True)
        return sorted_events

    def sort_events_by_target_host_ascending(self, event_list):
        def sorting_key(event):
            if event.target_host_list:
                return sorted(event.target_host_list)[0]
            else:
                return "zzzzz"

        sorted_events = sorted(event_list, key=sorting_key)
        return sorted_events

    def sort_events_by_target_host_descending(self, event_list):
        def sorting_key(event):
            if event.target_host_list is None or len(event.target_host_list) == 0:
                return ("", True)
            else:
                return (sorted(event.target_host_list)[-1], False)

        sorted_events = sorted(event_list, key=sorting_key, reverse=True)
        return sorted_events

    def sort_events_by_location_ascending(self, events: List[EventRepresenter]):
        def sorting_key(event):
            return (event.location or "zzzzz", event.location is None)

        sorted_events = sorted(events, key=sorting_key)
        return sorted_events

    def sort_events_by_location_descending(self, events: List[EventRepresenter]):
        def sorting_key(event):
            if event.location is None:
                return ("", True)
            else:
                return (event.location, False)

        sorted_events = sorted(events, key=sorting_key, reverse=True)
        return sorted_events

    def sort_events_by_vector_id_ascending(self, events: List[EventRepresenter]):
        def sorting_key(event):
            return (event.vector_id or "zzzzz", event.vector_id is None)

        sorted_events = sorted(events, key=sorting_key)
        return sorted_events

    def sort_events_by_vector_id_descending(self, events: List[EventRepresenter]):
        def sorting_key(event):
            if event.vector_id is None:
                return ("", True)
            else:
                return (event.vector_id, False)

        sorted_events = sorted(events, key=sorting_key, reverse=True)
        return sorted_events

    def sort_events_by_timestamp_ascending(self, events: List[EventRepresenter]):
        def sorting_key(event):
            if event.timestamp == "":
                future_date = "9999-12-31 23:59:59"
                return future_date, True
            else:
                return event.timestamp, False

        sorted_events = sorted(events, key=sorting_key)
        return sorted_events

    def sort_events_by_timestamp_descending(self, events: List[EventRepresenter]):
        def sorting_key(event):
            if event.timestamp is not None:
                return event.timestamp
            else:
                return ""

        sorted_events = sorted(events, key=sorting_key, reverse=True)
        return sorted_events
