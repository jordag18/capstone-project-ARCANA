from collections import defaultdict
from events_manager import EventsManager
from model import Graph


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
            node.update(
                {
                    "initials": updated_data.get("initials", node.get("initials")),
                    "team": updated_data.get("team", node.get("team")),
                    "icon": updated_data.get("icon", node.get("icon")),
                    "vector_id": updated_data.get("vector_id", node.get("vector_id")),
                    "description": updated_data.get(
                        "description", node.get("description")
                    ),
                    "data_source": updated_data.get(
                        "data_source", node.get("data_source")
                    ),
                    "action_title": updated_data.get(
                        "action_title", node.get("action_title")
                    ),
                    "last_modified": updated_data.get(
                        "last_modified", node.get("last_modified")
                    ),
                    "source_host": updated_data.get(
                        "source_host", node.get("source_host")
                    ),
                    "target_host_list": updated_data.get(
                        "target_host_list", node.get("target_host_list")
                    ),
                    "location": updated_data.get("location", node.get("location")),
                    "posture": updated_data.get("posture", node.get("posture")),
                    "timestamp": updated_data.get("timestamp", node.get("timestamp")),
                    "is_malformed": updated_data.get(
                        "is_malformed", node.get("is_malformed")
                    ),
                }
            )

            # Optionally handle changes affecting edge connections
            current_team = node.get("team")
            new_team = updated_data.get("team", current_team)
            if new_team != current_team:
                # This simplistic example assumes you might need to reprocess edges
                if new_team == "Red":
                    GraphManager.last_red = (
                        None  # or recalculate/redraw edges as needed
                    )
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
    def build_graph(project, auto_edges):
        groups = project.group_events_by(["vector_id", "initials"])
        groups = [EventsManager.sort_events_by(group, "timestamp") for group in groups]
        for events_group in groups:
            for event in events_group:
                GraphManager.add_event(event, auto_edges)

    @staticmethod
    def add_event(event, auto_edges):
        # Always add the node
        GraphManager.nodes[event.get_id()] = event.get_event_info()

        # Conditionally add edges based on auto_edges parameter
        if auto_edges:
            if event.is_malformed:
                GraphManager.edges[GraphManager.malformed_key].append(event.get_id())
            elif event.team == "red":
                if GraphManager.last_red is not None:
                    GraphManager.edges[GraphManager.last_red.get_id()].append(
                        event.get_id()
                    )
                GraphManager.last_red = event
            else:
                if GraphManager.last_blue is not None:
                    GraphManager.edges[GraphManager.last_blue.get_id()].append(
                        event.get_id()
                    )
                GraphManager.last_blue = event
        else:
            if event.team == "red":
                GraphManager.last_red = None
            else:
                GraphManager.last_blue = None
