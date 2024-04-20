"use client";
import React, { useCallback, useRef, useState, useEffect } from "react";
import { useProject } from "@/app/contexts/ProjectContext";
import ReactFlow, {
  Node,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  updateEdge, // Import updateEdge to handle edge updates
  Edge,
  Controls,
  OnConnect,
  OnEdgeUpdateFunc, // Correct type for edge update callback
} from "reactflow";
import { EventNode } from "@/app/components/graphComponents/EventNodeInterface";
import EventNodeContextMenu from "./EventNodeContextMenu";
import EditEventModal from "../../../components/eventComponents/event-modify-modal";
import "reactflow/dist/style.css";
import useGraphData from "@/app/components/graphComponents/GraphDataHook";
import CustomEventNode from "@/app/components/graphComponents/CustomEventNode";
import ButtonEdge from "@/app/components/graphComponents/ButtonEdge";

// Define component styles
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

const nodeTypes = {
  customEventNode: CustomEventNode,
};

const edgeTypes = {
  buttonEdge: ButtonEdge, // This key must match the type you set in the edges
};

const Flow = () => {
  const { project } = useProject();
  const { nodes, edges, isLoading, error } = useGraphData(project.name);
  const [nodesState, setNodes] = useState<EventNode[]>(nodes as EventNode[]);
  const [edgesState, setEdges] = useState<Edge[]>(edges);
  const [selectedNode, setSelectedNode] = useState<EventNode | null>(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const reactFlowWrapper = useRef(null);

  useEffect(() => {
    setNodes(nodes as EventNode[]);
    setEdges(edges);
  }, [nodes, edges]);

  // Need to redefine Add Node

  const onNodesChange = useCallback(
    (changes) => setNodes(applyNodeChanges(changes, nodesState)),
    [nodesState]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges(applyEdgeChanges(changes, edgesState)),
    [edgesState]
  );

  const onConnect = useCallback((connection) => {
    const newEdge = {
      ...connection,
      type: 'buttonEdge',
    };
    setEdges((eds) => addEdge(newEdge, eds));
  }, [setEdges]);
  

  // Define the onEdgeUpdate callback using the correct type
  const onEdgeUpdate: OnEdgeUpdateFunc = useCallback(
    (oldEdge, newConnection) =>
      setEdges((currentEdges) =>
        updateEdge(oldEdge, newConnection, currentEdges)
      ),
    []
  );

  // Event handlers for node and edge context menus, and modals
  const onNodeContextMenu = useCallback(
    (event: React.MouseEvent, node: Node) => {
      event.preventDefault(); // Prevent default context menu
      console.log("Right-clicked node:", node); // Debug log
      if (reactFlowWrapper.current) {
        const bounds = reactFlowWrapper.current.getBoundingClientRect();
        setMenuPosition({
          x: event.clientX - bounds.left,
          y: event.clientY - bounds.top,
        });
        setSelectedNode(node); // Only select the node and set up the menu position
      }
      console.log("Menu position set to:", event.clientX, event.clientY); // Debug log
    },
    []
  );

  if (!selectedNode) {
    console.log("No node selected"); // This will log if no node is selected
  }

  const deleteNode = useCallback((node: EventNode) => {
    setNodes((currentNodes) => currentNodes.filter((n) => n.id !== node.id));
    setEdges((currentEdges) =>
      currentEdges.filter((e) => e.source !== node.id && e.target !== node.id)
    );
  }, []);

  const closeContextMenu = () => setSelectedNode(null);

  const handleEditEvent = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedNode(null);
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col items-center w-full max-w-screen-xl h-screen mx-auto overflow-auto relative p-5 bg-[#B8CEFF]">
      <button
        onClick={() => {}}
        className="mb-4 text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
      >
        Create Event Node
      </button>
      <div className="w-full h-full" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodesState}
          edges={edgesState}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onEdgeUpdate={onEdgeUpdate}
          onNodeContextMenu={onNodeContextMenu}
          onConnect={onConnect}
          fitView
          fitViewOptions={{ padding: 1.0, includeHiddenNodes: true }}
        >
          <Controls />
          {selectedNode && (
            <EventNodeContextMenu
              node={selectedNode}
              onClose={closeContextMenu}
              onEdit={handleEditEvent}
              onDelete={deleteNode}
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
