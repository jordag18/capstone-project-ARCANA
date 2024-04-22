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
import CreateEventModal from "@/app/components/eventComponents/event-create-modal";
import ExportGraphData from "@/app/components/graphComponents/ExportGraphData";
import "reactflow/dist/style.css";
import useGraphData from "@/app/components/graphComponents/GraphDataHook";
import CustomEventNode from "@/app/components/graphComponents/CustomEventNode";
import ButtonEdge from "@/app/components/graphComponents/ButtonEdge";
import { CreateEvent } from "@/app/components/eventComponents/event-interface";

const nodeTypes = {
  customEventNode: CustomEventNode,
};

const edgeTypes = {
  buttonEdge: ButtonEdge, // This key must match the type you set in the edges
};

const Flow = () => {
  const { project } = useProject();
  const { nodes, edges, isLoading, error, refresh } = useGraphData(project.name);
  const [nodesState, setNodes] = useState<EventNode[]>(nodes as EventNode[]);
  const [edgesState, setEdges] = useState<Edge[]>(edges);
  const [selectedNode, setSelectedNode] = useState<EventNode | null>(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState<CreateEvent | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
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

  const onConnect = useCallback(
    (connection) => {
      const newEdge = {
        ...connection,
        type: "buttonEdge",
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

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
      if (reactFlowWrapper.current) {
        const bounds = reactFlowWrapper.current.getBoundingClientRect();
        setMenuPosition({
          x: event.clientX - bounds.left,
          y: event.clientY - bounds.top,
        });
        setSelectedNode(node); // Only select the node and set up the menu position
      }
    },
    []
  );

  const createNode = useCallback(() => {
    setIsCreateModalOpen(true);
  }, []);

  const handleCreateNode = useCallback(
    (eventData: CreateEvent) => {
      const newNode = {
        id: `n${nodesState.length + 1}`, // Ensure unique ID by incrementing
        type: "customEventNode",
        position: {
          x: Math.random() * window.innerWidth * 0.8,
          y: Math.random() * window.innerHeight * 0.8,
        },
        data: eventData,
      };
      setNodes((nodesState) => [...nodesState, newNode]);
      setIsCreateModalOpen(false);
    },
    [nodesState]
  );

  const handleCreateEventClose = useCallback(() => {
    setIsCreateModalOpen(false);
  }, []);

  const deleteNode = useCallback(
    async (node: EventNode) => {
      if (node.data.id && project) {
        try {
          const response = await fetch(
            `http://localhost:8000/api/deleteEvent/${project.name}/${node.data.id}`,
            {
              method: "DELETE",
            }
          );

          if (!response.ok) {
            throw new Error("Failed to delete the event");
          }

          alert(`Successfully deleted event with ID: ${node.data.id}`);
        } catch (error) {
          console.error("Error deleting event:", error);
          alert("Error deleting event");
          return;
        }
      }

      // Then update the frontend state to remove the node and any connected edges
      setNodes((currentNodes) => currentNodes.filter((n) => n.id !== node.id));
      setEdges((currentEdges) =>
        currentEdges.filter((e) => e.source !== node.id && e.target !== node.id)
      );
    },
    [project]
  );

  const closeContextMenu = () => setSelectedNode(null);

  const handleEditEvent = useCallback(() => {
    setIsEditModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsEditModalOpen(false);
    setSelectedNode(null);
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col items-center w-full max-w-screen-xl h-screen mx-auto overflow-auto relative p-5 bg-[#B8CEFF]">
      <div className="w-full h-full" ref={reactFlowWrapper}>
        <div className="button-group mt-4 flex justify-center space-x-4">
          <button
            onClick={createNode}
            className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
          >
            Create Event Node
          </button>
          <ExportGraphData
            nodes={nodesState}
            edges={edgesState}
            projectName={project.name}
          />
        </div>
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
      {isCreateModalOpen && (
        <CreateEventModal
          newEvent={newEvent}
          isModalOpen={isCreateModalOpen}
          onSubmit={handleCreateNode}
          onClose={() => setIsCreateModalOpen(false)}
        />
      )}
      {isEditModalOpen && selectedNode && (
        <EditEventModal
          selectedEvent={selectedNode.data}
          isModalOpen={isEditModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Flow;
