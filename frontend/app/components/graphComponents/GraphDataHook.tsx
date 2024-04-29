import { useState, useEffect, useCallback } from "react";
import { EventNode } from "./EventNodeInterface";
import { Event } from "../eventComponents/event-interface";
import { Edge } from "reactflow";

const createEventNodes = (eventsObject: Record<string, Event>): EventNode[] => {
  const gridSize = 300;
  return Object.keys(eventsObject).map((key, index) => {
    const event = eventsObject[key];
    const x = (index % 10) * gridSize;
    const y = Math.floor(index / 10) * gridSize;
    return {
      id: event.id,
      type: "customEventNode",
      position: { x, y },
      data: event,
    };
  });
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
    return { ...graphData, setSelectedGraph };
};

export default useGraphData;
