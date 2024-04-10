from project_representer import ProjectRepresenter
from collections import defaultdict
from events_manager import EventsManager
from model import Graph


class GraphManager:
    @staticmethod
    def get_project_graphs(project: ProjectRepresenter) -> Graph:
        # Group events by vector id and by initials
        print("help", project)
        groups = project.group_events_by(["vector_id", "initials"])
        # Sort each group by timestamp
        groups = [EventsManager.sort_events_by(group, "timestamp") for group in groups]

        # All the malfunction events are map to the None key
        malformed_key = ""

        # The first event in a graph is the root
        roots = [events[0].get_id() for events in groups]
        d = defaultdict(list)

        # Prevent illigal indexing to get malformed events
        d[malformed_key] = []

        for events in groups:
            # Set last seen nodes base on root event
            new_event = events[0]
            last_red, last_blue = (
                (new_event, None) if new_event.team == "Red" else (None, new_event)
            )

            i = 1
            while i < len(events):
                # Get all events with same time
                same_time_events = [events[i]]
                first_event_timestamp = same_time_events[0].timestamp
                i += 1
                while i < len(events) and events[i].timestamp == first_event_timestamp:
                    same_time_events.append(events[i])

                # Filter malformed events
                malformed_events, good_events = EventsManager.group_events_by_bool(
                    same_time_events, "is_malformed"
                )
                d[malformed_key].extend(
                    [event.get_event_info() for event in malformed_events]
                )

                # If no red had been seen
                if last_red is None:
                    # Add event to previous blue node
                    d[last_blue.get_id()] = [
                        event.get_event_info() for event in good_events
                    ]

                    # Update last red/blue event saw so far
                    for event in good_events:
                        if event.team == "Red":
                            last_red = event
                        else:
                            last_blue = event
                    continue

                # Because we know have red and blue nodes, follow this rules to add nodes:
                # R, B(T1), B(T1)   -> {R: [B(T1), B(T1)],  B(T1): [],      B(T2): []}
                # R, B(T1), B(T2)   -> {R: [B(T1)],         B(T1): [B(T2)], B(T2): []}
                # R1, B1, R2, B2    -> {R1: [B1, R2],       B1: [],         R2: [B2],   B2: []}

                for team, group in EventsManager.group_events_by(
                    good_events, "team"
                ).items():
                    if team == "Blue" or team == "White":
                        # Add nodes to the most resent node
                        if last_red.timestamp >= last_blue.timestamp:
                            d[last_red.get_id()].extend(
                                [event.get_event_info() for event in group]
                            )
                        else:
                            d[last_blue.get_id()].extend(
                                [event.get_event_info() for event in group]
                            )
                        # Update last blue seen
                        last_blue = group[-1]
                    elif team == "Red":
                        # Red events always pointed to by Red events (w/ the exeption when the root is not Red)
                        d[last_red.get_id()].extend(
                            [event.get_event_info() for event in group]
                        )
                        last_red = group[-1]
                    else:
                        print(
                            "Nodes in graph doesn't belong to a valid team. So, malfunction flag would be set to true for the following events:"
                        )
                        for event in group:
                            print("Event:")
                            for key, value in event.get_event_info():
                                print(f"{key}: {value}")
                            event.update_event({"is_malformed": True})
                        d[malformed_key].extend(
                            [event.get_event_info() for event in group]
                        )

        print(f"type(roots) = {type(roots)}")
        print(f"type(roots[0]) = {type(roots[0])}")
        print(f"type(d) = {type(d)}")
        print(f"type(malformed_key) = {type(malformed_key)}")

        return {"roots": roots, "graph": d, "malformed_key": malformed_key}
