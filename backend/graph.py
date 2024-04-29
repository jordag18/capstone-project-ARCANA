from collections import defaultdict
from events_manager import EventsManager
from model import Graph


class GraphManager:

    @staticmethod
    def edit_event(graphs, vector_id, event_id, new_data):
        """Edit a specific event based on its event_id."""
        if vector_id in graphs:
            for events in graphs[vector_id]['events'].values():
                for event in events:
                    if event['id'] == event_id:
                        for key, value in new_data.items():
                            event[key] = value
                        break  # Assuming only one event per ID, break once found and updated

    @staticmethod
    def delete_node(graphs, vector_id, event_id):
        """Delete a node and all connected edges."""
        if vector_id in graphs:
            graph = graphs[vector_id]
            if event_id in graph['events']:
                # Remove the node
                del graph['events'][event_id]
                # Remove associated edges
                if event_id in graph['edges']:
                    del graph['edges'][event_id]
                # Remove incoming edges
                for key in list(graph['edges'].keys()):
                    if event_id in graph['edges'][key]:
                        graph['edges'][key].remove(event_id)
            if not graph['events']:  # If no events left, remove the graph
                del graphs[vector_id]

    @staticmethod
    def add_node(graphs, event, vector_id, auto_edges):
        graph_key = vector_id
        if graph_key not in graphs:
            graphs[graph_key] = {
                'events': defaultdict(list),
                'edges': defaultdict(list),
                'last_event': None,
                'last_red': None,
                'unconnected_blues': []
            }

        graph = graphs[graph_key]
        events = graph['events']
        edges = graph['edges']
        last_event = graph['last_event']
        last_red = graph['last_red']
        unconnected_blues = graph['unconnected_blues']

        event_info = event.get_event_info()
        event_id = event.get_id()

        # Always add the event info to its own ID
        events[event_id].append(event_info)

        if auto_edges:
            if event.team == "blue":
                if last_red:
                    edges[last_red].append(event_id)  # Connect current blue to the last red
                    last_red = None  # Clear last red after connecting
                elif last_event:
                    edges[last_event].append(event_id)  # Chain blue directly to last event if no reds to connect to
            else:  # event.team == "red"
                if last_event and last_event != event_id:
                    edges[last_event].append(event_id)  # Chain red to red
                last_red = event_id  # Update last red node

            # Update the last event tracker for both red and blue events
            last_event = event_id

        # Update the graph structure
        graph['last_event'] = last_event
        graph['last_red'] = last_red
        graph['unconnected_blues'] = unconnected_blues

    @staticmethod
    def get_project_graphs(project, auto_edges=True):
        groups = project.group_events_by(["vector_id"])
        sorted_groups = [sorted(group, key=lambda x: x.timestamp) for group in groups]  # Sort each group by timestamp
        graphs = {}

        # Print sorted groups to see their structure and order
        for index, group in enumerate(sorted_groups):
            print(f"Group {index + 1}:")
            for event in group:
                print(f" - {event.vector_id}, {event.initials}, {event.timestamp}")

        for group in sorted_groups:
            vector_id = group[0].vector_id  # Assuming all events in a group have the same vector_id
            for event in group:
                if event.is_malformed:
                    continue
                GraphManager.add_node(graphs, event, vector_id, auto_edges)

        # Prints the edges for each graph
        for graph_id, graph_data in graphs.items():
            print(f"Graph ID: {graph_id}")
            for event_id, edge_list in graph_data['edges'].items():
                print(f"Event {event_id} has edges to: {edge_list}")

        return graphs
