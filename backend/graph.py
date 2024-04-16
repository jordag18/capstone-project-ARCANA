from project_representer import ProjectRepresenter
from collections import defaultdict
from events_manager import EventsManager
from model import Graph


class GraphManager:
    @staticmethod
    def get_project_graphs(project: ProjectRepresenter) -> Graph:
        groups = project.group_events_by(["vector_id", "initials"])
        groups = [EventsManager.sort_events_by(group, "timestamp") for group in groups]

        # Initialize dictionaries to store nodes and edges
        nodes = {}
        edges = defaultdict(list)

        # The first event in a graph is the root
        roots = [events[0].get_id() for events in groups]

        # All the malfunction events are mapped to the None key
        malformed_key = ""

        for events in groups:
            # Set last seen nodes based on root event
            new_event = events[0]
            last_red, last_blue = (
                (new_event, None) if new_event.team == "Red" else (None, new_event)
            )

            i = 1
            while i < len(events):
                # Get all events with the same time
                same_time_events = [events[i]]
                first_event_timestamp = same_time_events[0].timestamp
                i += 1
                while i < len(events) and events[i].timestamp == first_event_timestamp:
                    same_time_events.append(events[i])

                # Filter malformed events
                malformed_events, good_events = EventsManager.group_events_by_bool(
                    same_time_events, "is_malformed"
                )

                # Add good events to nodes
                for event in good_events:
                    nodes[event.get_id()] = event.get_event_info()

                # If no red had been seen
                if last_red is None:
                    # Add event to previous blue node
                    edges[last_blue.get_id()].extend([event.get_id() for event in good_events])

                    # Update last red/blue event seen so far
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

                # Update edges based on team and order of events
                for team, group in EventsManager.group_events_by(good_events, "team").items():
                    if team == "Blue" or team == "White":
                        # Add edges to the most recent node
                        if last_red.timestamp >= last_blue.timestamp:
                            edges[last_red.get_id()].extend([event.get_id() for event in group])
                        else:
                            edges[last_blue.get_id()].extend([event.get_id() for event in group])
                        # Update last blue seen
                        last_blue = group[-1]
                    elif team == "Red":
                        # Red events always pointed to by Red events (with the exception when the root is not Red)
                        edges[last_red.get_id()].extend([event.get_id() for event in group])
                        last_red = group[-1]

                # Add malformed events to nodes and edges
                for event in malformed_events:
                    event.update_event({"is_malformed": True})
                    nodes[event.get_id()] = event.get_event_info()
                    edges[malformed_key].append(event.get_id())

        return {"roots": roots, "nodes": nodes, "edges": edges, "malformed_key": malformed_key}
 