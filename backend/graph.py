
from collections import defaultdict
from events_manager import EventsManager
from model import Graph
from Filter import Filter


class GraphManager:
    # Static attributes
    nodes = {}
    edges = defaultdict(list)
    last_red = None
    last_blue = None
    malformed_key = ""

    @staticmethod
    def edit_event(event_id, updated_data):
        event_id_str = str(event_id)  # Convert ObjectId to string if not already
        if event_id_str in GraphManager.nodes:
            # Extract and update node data from updated_data dictionary
            node = GraphManager.nodes[event_id_str]
            node.update({
                "initials": updated_data.get('initials', node.get('initials')),
                "team": updated_data.get('team', node.get('team')),
                "icon": updated_data.get('icon', node.get('icon')),
                "vector_id": updated_data.get('vector_id', node.get('vector_id')),
                "description": updated_data.get('description', node.get('description')),
                "data_source": updated_data.get('data_source', node.get('data_source')),
                "action_title": updated_data.get('action_title', node.get('action_title')),
                "last_modified": updated_data.get('last_modified', node.get('last_modified')),
                "source_host": updated_data.get('source_host', node.get('source_host')),
                "target_host_list": updated_data.get('target_host_list', node.get('target_host_list')),
                "location": updated_data.get('location', node.get('location')),
                "posture": updated_data.get('posture', node.get('posture')),
                "timestamp": updated_data.get('timestamp', node.get('timestamp')),
                "is_malformed": updated_data.get('is_malformed', node.get('is_malformed')),
            })

            # Optionally handle changes affecting edge connections
            current_team = node.get('team')
            new_team = updated_data.get('team', current_team)
            if new_team != current_team:
                # This simplistic example assumes you might need to reprocess edges
                if new_team == 'Red':
                    GraphManager.last_red = None  # or recalculate/redraw edges as needed
                else:
                    GraphManager.last_blue = None  # Adjust similarly for other teams
            print(f"Event {event_id_str} updated in graph with new data.")
        else:
            print(f"No node found for event_id {event_id_str} to update.")


    @staticmethod
    def delete_event(event_id):
        # Remove the node
        if event_id in GraphManager.nodes:
            del GraphManager.nodes[event_id]

        # Remove all edges leading to and from this node
        # Remove outgoing edges from this node
        if event_id in GraphManager.edges:
            del GraphManager.edges[event_id]

        # Remove this node from any incoming edges lists
        for key in list(GraphManager.edges.keys()):
            if event_id in GraphManager.edges[key]:
                GraphManager.edges[key].remove(event_id)
                # If no edges remain for this key, remove the key entirely
                if not GraphManager.edges[key]:
                    del GraphManager.edges[key]

        # Reset last pointers if they point to the deleted node
        if GraphManager.last_red and GraphManager.last_red.get_id() == event_id:
            GraphManager.last_red = None
        if GraphManager.last_blue and GraphManager.last_blue.get_id() == event_id:
            GraphManager.last_blue = None

    @staticmethod
    def build_graph(project, auto_edges=True):
        groups = project.group_events_by(["vector_id", "initials"])
        groups = [EventsManager.sort_events_by(group, "timestamp") for group in groups]
        for events_group in groups:
            for event in events_group:
                GraphManager.add_event(event, auto_edges)

    @staticmethod
    def add_event(event, auto_edges):
        # Always add the node
        GraphManager.nodes[event.get_id()] = event.get_event_info()

        for events in groups:
            # Add the first event of each group to nodes
            first_event = events[0]
            nodes[first_event.get_id()] = first_event.get_event_info()

            # Set last seen nodes based on root event
            new_event = first_event
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

        return {"nodes": nodes, "edges": edges, "malformed_key": malformed_key}
    
   
@staticmethod
def sort_graph(project, sort_criteria) -> Graph:
    """
    Sorts a list of events based on the given criteria and returns a graph.
    """

    match sort_criteria:
        case "timestamp_descending":
            sorted_events = Filter.sort_events_by_timestamp_ascending(project, project.event_list)
        case "timestamp_ascending":
            sorted_events = Filter.sort_events_by_timestamp_descending(project, project.event_list)
        case "location_ascending":
            sorted_events = Filter.sort_events_by_location_ascending(project, project.event_list)
        case "location_descending":
            sorted_events = Filter.sort_events_by_location_descending(project, project.event_list)
        case "vector_id_ascending":
            sorted_events = Filter.sort_events_by_vector_id_ascending(project, project.event_list)
        case "vector_id_descending":
            sorted_events = Filter.sort_events_by_vector_id_descending(project, project.event_list)

    # Initialize dictionaries to store nodes and edges
    nodes = {}
    edges = defaultdict(list)
    
    # All the malformed events are mapped to the None key
    malformed_key = ""

    # Initialize variable to store the previous event ID
    previous_event_id = None

    # Process sorted events
    for event in sorted_events:
        event_id = event.get_id()
        nodes[event_id] = event.get_event_info()

        # Handle malformed events
        if event.is_malformed:
            edges[malformed_key].append(event_id)
            continue

        # Connect events with edges
        if previous_event_id:
            edges[previous_event_id].append(event_id)

        # Update previous event ID
        previous_event_id = event_id

    return {"nodes": nodes, "edges": edges, "malformed_key": malformed_key}
        # Conditionally add edges based on auto_edges parameter
        if auto_edges:
            if event.is_malformed:
                GraphManager.edges[GraphManager.malformed_key].append(event.get_id())
            elif event.team == "Red":
                if GraphManager.last_red is not None:
                    GraphManager.edges[GraphManager.last_red.get_id()].append(event.get_id())
                GraphManager.last_red = event
            else:
                if GraphManager.last_blue is not None:
                    GraphManager.edges[GraphManager.last_blue.get_id()].append(event.get_id())
                GraphManager.last_blue = event
        else:
            if event.team == "Red":
                GraphManager.last_red = None
            else:
                GraphManager.last_blue = None
