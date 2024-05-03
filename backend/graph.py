from collections import defaultdict
from bson import ObjectId
from event_representer import EventRepresenter
from model import Graph


class GraphManager:

    @staticmethod
    def edit_node(project, vector_id: str, event_id: str, new_event: EventRepresenter):
        """
        Edit a specific event based on its event_id and vector_id using the new_event data.
        """
        graph_data = project.project_graph
        if vector_id in graph_data:
            graph = graph_data[vector_id]
            if 'events' in graph and event_id in graph['events']:
                events = graph['events']
                for event_list in events.values():
                    for event in event_list:
                        if event['id'] == event_id:
                            # Update the existing event with new data
                            for key, value in new_event.get_event_info().items():
                                event[key] = value
                            break

        return graph_data

    @staticmethod
    def delete_node(project, vector_id, event_id):
        """
        Delete a node and all connected edges from the project's graph based on vector_id and event_id.
        """
        graph_data = project.project_graph
        if vector_id in graph_data:
            graph = graph_data[vector_id]
            if 'events' in graph and event_id in graph['events']:
                # Remove the node
                del graph['events'][event_id]
                # Remove associated edges
                if 'edges' in graph and event_id in graph['edges']:
                    del graph['edges'][event_id]
                # Remove incoming edges
                if 'edges' in graph:
                    for key in list(graph['edges'].keys()):
                        if event_id in graph['edges'][key]:
                            graph['edges'][key].remove(event_id)
                if not graph['events']:  # If no events left, removing the graph
                    del graph_data[vector_id]

            data = graph_data
            return data

    @staticmethod
    def add_node(project, event, vector_id, auto_edges):
        graphs = project.graphbe

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
        else:
            edges[event_id] = []
            last_event = event_id

        # Update the graph structure
        graph['last_event'] = last_event
        graph['last_red'] = last_red
        graph['unconnected_blues'] = unconnected_blues

        # Update the project's project_graph attribute
        project.graphbe = graphs

        # Return the updated project object
        return project.graphbe

    @staticmethod
    def get_project_graphs(project, auto_edges):
        groups = project.group_events_by(["vector_id"])
        sorted_groups = [sorted(group, key=lambda x: x.timestamp) for group in groups]  # Sort each group by timestamp
        #graphs = {}

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
                GraphManager.add_node(project, event, vector_id, auto_edges)

        # Prints the edges for each graph
        for graph_id, graph_data in project.graphbe.items():
            print(f"Graph ID: {graph_id}")
            for event_id, edge_list in graph_data['edges'].items():
                print(f"Event {event_id} has edges to: {edge_list}")

        return project.graphbe
