import { useState, useEffect } from 'react';
import { EventNode } from './EventNodeInterface';
import { Event } from '../eventComponents/event-interface';
import { Edge } from 'reactflow';


interface GraphData {
    nodes: EventNode[];
    edges: Edge[];
    isLoading: boolean;
    error: string | null;
}



const createEventNodes = (eventsObject: Record<string, Event>): EventNode[] => {
    const gridSize = 300; // Distance between nodes
    return Object.keys(eventsObject).map((key, index) => {
        const event = eventsObject[key];
        const x = (index % 10) * gridSize; 
        const y = Math.floor(index / 10) * gridSize;
        return {
            id: event.id,
            type: 'customEventNode',
            position: { x, y },
            data: event
        };
    });
};

const createEdges = (edgesObject: Record<string, string[]>): Edge[] => {
    const edges: Edge[] = [];
  
    Object.entries(edgesObject).forEach(([source, targets]) => {
      targets.forEach(target => {
        const edge: Edge = {
          id: `e${source}-${target}`,  // Create a unique ID for the edge
          source: source,
          target: target,
          type: 'buttonEdge', // This should match the key in edgeTypes
        };
        edges.push(edge);
      });
    });
  
    return edges;
  };

const useGraphData = (projectName: string): GraphData => {
    const [graphData, setGraphData] = useState<GraphData>({ nodes: [], edges: [], isLoading: true, error: null });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/${projectName}/graphs`);
                const data = await response.json();

                //Creates array of nodes and edges using data from response
                const eventNodes = createEventNodes(data.nodes);
                const projectEdges = createEdges(data.edges);

                // Validate and transform data before setting state
                const validatedNodes = Array.isArray(eventNodes) ? eventNodes : [];
                const validatedEdges = Array.isArray(projectEdges) ? projectEdges : [];

                setGraphData({ 
                    nodes: validatedNodes, 
                    edges: validatedEdges, 
                    isLoading: false, 
                    error: null 
                });
            } catch (error) {
                console.error("Error fetching graph data:", error);
                setGraphData({ 
                    nodes: [], 
                    edges: [], 
                    isLoading: false, 
                    error: error instanceof Error ? error.message : String(error)
                });
            }
        };

        if (projectName) {
            fetchData();
        }
    }, [projectName]);


    return graphData;
};

export default useGraphData;


