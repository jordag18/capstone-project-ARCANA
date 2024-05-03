import { useState, useEffect, useCallback } from "react";
import { EventNode } from "./EventNodeInterface";
import { Event } from "../eventComponents/event-interface";
import { Edge } from "reactflow";

const createEventNodes = (eventsObject) => {
  const gridSizeX = 400; // Horizontal spacing remains the same
  const gridSizeY = 700; // Increase vertical spacing to 600 or more if needed

  // Map over keys in the eventsObject
  return Object.keys(eventsObject).flatMap((key, index) => {
    // Access the first element of the array to get the actual event object
    const event = eventsObject[key][0];
    if (!event.id) {
      console.error('Event missing ID:', event);
      return [];  // Return an empty array to keep flatMap clean
    }
    const x = (index % 10) * gridSizeX; // Horizontal spacing
    const y = Math.floor(index / 10) * gridSizeY; // Vertical spacing
    return [{
      id: event.id.toString(),  // Ensure the ID is a string
      type: 'customEventNode',
      position: { x, y },
      data: event
    }];
  });  // Using flatMap to flatten the arrays into a single array
};


const createEdges = (edgesObject: Record<string, string[]>): Edge[] => {
  let edges = []; // Initialize edges as an array

  Object.entries(edgesObject).forEach(([source, targets]) => {
    const sourceEdges = targets.map((target) => ({
      id: `e${source}-${target}`,
      source: source,
      target: target,
      type: "buttonEdge",
    }));
    edges.push(...sourceEdges); // Push all edges from sourceEdges to the main edges array
  });

  return edges; // Return the correctly populated edges array
};

const useGraphData = (projectName: string) => {
 const [graphData, setGraphData] = useState({
        graphs: {},
        selectedGraph: null,
        nodes: [],
        edges: [],
        isLoading: true,
        error: null
    });    const [refreshIndex, setRefreshIndex] = useState(0);

  const refresh = useCallback(() => {
    setRefreshIndex((index) => index + 1);
  }, []);

    useEffect(() => {
        const fetchData = async () => {
            setGraphData(prev => ({ ...prev, isLoading: true }));
            try {
                const response = await fetch(`http://localhost:8000/api/${projectName}/graphs`);
                const data = await response.json();
                console.log(data)
                const initialGraphKey = Object.keys(data.graphs)[0];
                console.log("Here",data.graphs[initialGraphKey].events)
                const nodes = createEventNodes(data.graphs[initialGraphKey].events);
                const edges = createEdges(data.graphs[initialGraphKey].edges);
                console.log("Created nodes:", nodes);  // Log created nodes
                console.log("Created edges:", edges);  // Log created edges
                setGraphData({
                    graphs: data.graphs,
                    selectedGraph: initialGraphKey,
                    nodes: nodes,
                    edges: edges,
                    isLoading: false,
                    error: null
                });
            } catch (error) {
                console.error("Error fetching graph data:", error);
                setGraphData({
                    graphs: {},
                    selectedGraph: null,
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
  }, [projectName, refreshIndex]);

    
 const setSelectedGraph = (graphKey) => {
        console.log(`Changing selected graph to: ${graphKey}`);  // Log graph selection change
        const selectedNodes = createEventNodes(graphData.graphs[graphKey].events);
        const selectedEdges = createEdges(graphData.graphs[graphKey].edges);
        console.log("Updated nodes for selected graph:", selectedNodes);  // Log updated nodes for the new graph
        console.log("Updated edges for selected graph:", selectedEdges);  // Log updated edges for the new graph
        setGraphData(prev => ({
            ...prev,
            selectedGraph: graphKey,
            nodes: selectedNodes,
            edges: selectedEdges
        }));
    };
    return { ...graphData, setSelectedGraph, refresh };
};

export default useGraphData;
