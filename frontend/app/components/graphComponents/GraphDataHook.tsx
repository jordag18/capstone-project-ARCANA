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
    nodes: [],
    edges: [],
    isLoading: true,
    error: null,
  });
  const [refreshIndex, setRefreshIndex] = useState(0);

  const refresh = useCallback(() => {
    setRefreshIndex((index) => index + 1);
  }, []);

    useEffect(() => {
        const fetchData = async () => {
            setGraphData((prevData) => ({ ...prevData, isLoading: true }));
            try {
                const response = await fetch(`http://localhost:8000/api/${projectName}/graphs`);
                const data = await response.json();
                console.log(data)
                const eventNodes = createEventNodes(data.nodes);
                const projectEdges = createEdges(data.edges);

        setGraphData({
          nodes: eventNodes,
          edges: projectEdges,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        console.error("Error fetching graph data:", error);
        setGraphData({
          nodes: [],
          edges: [],
          isLoading: false,
          error: error instanceof Error ? error.message : String(error),
        });
      }
    };

    if (projectName) {
      fetchData();
    }
  }, [projectName, refreshIndex]);

  return { ...graphData, refresh };
};

export default useGraphData;
