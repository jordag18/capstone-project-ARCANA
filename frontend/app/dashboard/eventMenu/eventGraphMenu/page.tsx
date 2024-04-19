"use client";
import React, { useCallback, useEffect, useState, useRef } from "react";
import { useProject } from "@/app/contexts/ProjectContext";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Controls,
} from "reactflow";
import EventNodeContextMenu from "./EventNodeContextMenu";
import EditEventModal from "../../../components/eventComponents/event-modify-modal";
import "reactflow/dist/style.css";

const rfStyle = {
  backgroundColor: "#B8CEFF",
  width: "100%",
  height: "100vh",
};

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  maxWidth: "2000px",
  height: "100vh",
  margin: "20px auto",
  overflow: "auto",
  position: "relative",
};

const Flow = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const reactFlowWrapper = useRef(null);
  const { project } = useProject();

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
    setNodes((nds) => [...nds, newNode]);
  }, []);

  const onNodeContextMenu = (event, node) => {
    event.preventDefault();
    if (reactFlowWrapper.current) {
      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      setSelectedNode(node);
      setMenuPosition({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });
    }
  };

  const closeContextMenu = () => {
    setSelectedNode(null);
  };

  const handleEditEvent = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetch(`http://localhost:8000/api/${project.name}/graphs`)
      .then((response) => response.json())
      .then((data) => {
        const nodeSpacing = 250;
        const rowSize = 4;
        let yOffset = 0;
        let xOffset = 0;

        const fetchedNodes = Object.values(data.nodes).map((node, index) => {
          if (index % rowSize === 0 && index !== 0) {
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
      .catch((error) => {
        console.error("Error fetching node data:", error);
      });
  }, []);

  return (
    <div style={containerStyle}>
      <button onClick={addNode} style={{ margin: "10px" }}>
        Create Event Node
      </button>
      <div style={{ width: "100%", height: "100%" }} ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={useCallback(
            (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
            []
          )}
          onEdgesChange={useCallback(
            (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
            []
          )}
          onNodeContextMenu={onNodeContextMenu}
          onConnect={useCallback(
            (connection) => setEdges((eds) => addEdge(connection, eds)),
            []
          )}
          fitView
          fitViewOptions={{ padding: 1.0, includeHiddenNodes: true }}
          style={rfStyle}
        >
          <Controls />
          {selectedNode && (
            <EventNodeContextMenu
              node={selectedNode}
              onClose={closeContextMenu}
              onEdit={handleEditEvent}
              style={{
                position: "absolute",
                left: `${menuPosition.x}px`,
                top: `${menuPosition.y}px`,
                zIndex: 1000,
              }}
            />
          )}
        </ReactFlow>
      </div>
      {isModalOpen && selectedNode && (
        <EditEventModal
          selectedEvent={selectedNode.data}
          isModalOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Flow;
