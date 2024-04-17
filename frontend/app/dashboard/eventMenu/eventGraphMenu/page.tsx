"use client";
import React, { useCallback, useEffect, useState, useRef } from "react";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Controls,
} from "reactflow";
import EventNodeContextMenu from "./EventNodeContextMenu"; // Adjust the path according to your directory structure
import "reactflow/dist/style.css";

const rfStyle = {
  backgroundColor: "#B8CEFF",
  width: "100%", // Set width to 100% of parent container
  height: "100vh", // Set height to 100% of viewport height
};
const containerStyle = {
  display: "flex",
  flexDirection: "column", // Stack items vertically
  alignItems: "center", // Center items horizontally
  width: "100%", // Increase width to take more space
  maxWidth: "2000px", // Set a maximum width limit
  height: "100vh", // Set a maximum height
  margin: "20px auto", // Center the container horizontally and add vertical space
  overflow: "auto", // Add scrollbars if needed
};

const Flow = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const reactFlowWrapper = useRef(null);

  const onNodeContextMenu = (event, node) => {
    event.preventDefault();
    setSelectedNode(node);
    setMenuPosition({ x: event.clientX, y: event.clientY });
  };

  const closeContextMenu = () => {
    setSelectedNode(null);
  };

  useEffect(() => {
    fetch(`http://localhost:8000/api/Tee/graphs`)
      .then((response) => response.json())
      .then((data) => {
        let yOffset = 0;
        let xOffset = 0;
        const nodeSpacing = 250; // Increased spacing to 250 pixels
        const rowSize = 4; // Nodes per row before wrapping
        const fetchedNodes = Object.values(data.nodes).map((node, index) => {
          if (index % rowSize === 0 && index !== 0) {
            // Adjust row size
            xOffset = 0;
            yOffset += nodeSpacing;
          } else {
            xOffset += nodeSpacing;
          }

          return {
            id: node.id,
            type: "default",
            position: { x: xOffset, y: yOffset },
            data: {
              label: `Description: ${node.description}\nLocation: ${node.location}\nInitials: ${node.initials}`,
              value: node.id,
            },
          };
        });

        const fetchedEdges = Object.entries(data.edges).flatMap(
          ([source, targets]) =>
            targets.map((target) => ({
              id: `${source}-${target}`,
              source,
              target,
            }))
        );

        setNodes(fetchedNodes);
        setEdges(fetchedEdges);
      })
      .catch((error) => console.error("Error fetching node data:", error));
  }, []);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const addNode = useCallback(() => {
    const newNode = {
      id: `random-id-${Math.random()}`,
      type: "default",
      position: {
        x: (Math.random() * window.innerWidth) / 2,
        y: (Math.random() * window.innerHeight) / 2,
      },
      data: { label: "New Node" },
    };
    setNodes((nds) => nds.concat(newNode));
  }, []);

  return (
    <div style={containerStyle}>
      <button onClick={addNode} style={{ margin: "10px" }}>
        Create Event Node
      </button>
      <div style={{ width: "100%", height: "100%" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeContextMenu={onNodeContextMenu}
          onConnect={onConnect}
          fitView
          fitViewOptions={{
            padding: 1.0, // Additional padding as a zoom-out factor
            includeHiddenNodes: true,
          }}
          style={rfStyle}
        >
          <Controls />{" "}
          {selectedNode && (
            <EventNodeContextMenu
              node={selectedNode}
              onClose={closeContextMenu}
              style={{
                left: `${menuPosition.x}px`,
                top: `${menuPosition.y}px`,
              }}
            />
          )}
        </ReactFlow>
      </div>
    </div>
  );
};

export default Flow;
