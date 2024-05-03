"use client";
import React, { useCallback, useRef, useState, useEffect } from "react";
import { useProject } from "@/app/contexts/ProjectContext";
import ReactFlow, {
  Node,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  updateEdge,
  Edge,
  Controls,
  OnConnect,
  OnEdgeUpdateFunc,
} from "reactflow";
import { EventNode } from "@/app/components/graphComponents/EventNodeInterface";
import EventNodeContextMenu from "./EventNodeContextMenu";
import EditEventModal from "../../../components/eventComponents/event-modify-modal";
import CreateEventModal from "@/app/components/eventComponents/event-create-modal";
import ExportGraphData from "@/app/components/graphComponents/ExportGraphData";
import ImportGraphModal from "@/app/components/graphComponents/ImportGraphModal";
import "reactflow/dist/style.css";
import useGraphData from "@/app/components/graphComponents/GraphDataHook";
import CustomEventNode from "@/app/components/graphComponents/CustomEventNode";
import ButtonEdge from "@/app/components/graphComponents/ButtonEdge";
import { CreateEvent } from "@/app/components/eventComponents/event-interface";

const FilterModal = ({
  isOpen,
  onClose,
  filterCriteria,
  setFilterCriteria,
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded shadow-lg w-1/3">
        <h2 className="text-lg mb-4">Set Filters</h2>
        {Object.keys(filterCriteria).map((key) => (
          <div key={key} className="mb-3">
            <label className="block text-gray-700 text-sm font-bold mb-2 capitalize">
              {key.replace(/_/g, " ")}
            </label>
            <input
              type="text"
              placeholder={`Filter by ${key}`}
              value={filterCriteria[key]}
              onChange={(e) =>
                setFilterCriteria((prev) => ({
                  ...prev,
                  [key]: e.target.value,
                }))
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        ))}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-grey-500 hover:bg-grey-700 text-white font-bold py-2 px-4 rounded">
            Close
          </button>
          <button
            onClick={() => {
              onClose();
            }} // This can be replaced with a function that applies filters explicitly if needed.
            className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

const nodeTypes = {
  customEventNode: CustomEventNode,
};

const edgeTypes = {
  buttonEdge: ButtonEdge,
};

const Flow = () => {
  const { project } = useProject();
  const { graphs, selectedGraph, nodes, edges, isLoading, error, refresh, setSelectedGraph } = useGraphData(project.name);
  const [nodesState, setNodes] = useState<EventNode[]>(nodes as EventNode[]);
  const [edgesState, setEdges] = useState<Edge[]>(edges);
  const [filterCriteria, setFilterCriteria] = useState({
    initials: "",
    team: "",
    location: "",
    posture: "",
    data_source: "",
    timestamp: "",
    vector_id: "",
    source_host: "",
    target_host_list: "",
  });
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<EventNode | null>(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState<CreateEvent | null>(null);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const reactFlowWrapper = useRef(null);

  useEffect(() => {
    console.log("Setting initial nodes and edges from hook:", nodes, edges);
    setNodes(nodes as EventNode[]);
    setEdges(edges);
  }, [nodes, edges]);

  const filteredNodes = nodesState.filter((node) => {
    return Object.entries(filterCriteria).every(([key, value]) => {
      return value === "" || node.data[key]?.includes(value);
    });
  });

  const onNodesChange = useCallback(
    (changes) => {
      const newNodes = applyNodeChanges(changes, nodesState);
      console.log("Nodes after change:", newNodes);
      setNodes(newNodes);
    },
    [nodesState]
  );

  const onEdgesChange = useCallback(
    (changes) => {
      const newEdges = applyEdgeChanges(changes, edgesState);
      console.log("Edges after change:", newEdges);
      setEdges(newEdges);
    },
    [edgesState]
  );

  const onConnect = useCallback(
    (connection) => {
      const newEdge = { ...connection, type: "buttonEdge" };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  const onEdgeUpdate: OnEdgeUpdateFunc = useCallback(
    (oldEdge, newConnection) =>
      setEdges((currentEdges) =>
        updateEdge(oldEdge, newConnection, currentEdges)
      ),
    []
  );

  const onNodeContextMenu = useCallback(
    (event: React.MouseEvent, node: Node) => {
      event.preventDefault();
      if (reactFlowWrapper.current) {
        const bounds = reactFlowWrapper.current.getBoundingClientRect();
        setMenuPosition({
          x: event.clientX - bounds.left,
          y: event.clientY - bounds.top,
        });
        setSelectedNode(node);
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
        id: `n${nodesState.length + 1}`,
        type: "customEventNode",
        position: {
          x: Math.random() * window.innerWidth * 0.8,
          y: Math.random() * window.innerHeight * 0.8,
        },
        data: eventData,
      };
      setNodes((ns) => [...ns, newNode]);
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

  const handleImportedContent = (xmlContent) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlContent, "application/xml");

    const parsedNodes = Array.from(xmlDoc.getElementsByTagName("Node")).map(
      (node) => ({
        id: node.getAttribute("id"),
        type: "customEventNode",
        position: {
          x: parseFloat(node.getAttribute("positionX")),
          y: parseFloat(node.getAttribute("positionY")),
        },
        data: JSON.parse(node.getElementsByTagName("Data")[0].textContent),
      })
    );

    const parsedEdges = Array.from(xmlDoc.getElementsByTagName("Edge")).map(
      (edge) => ({
        id: edge.getAttribute("id"),
        source: edge.getAttribute("source"),
        target: edge.getAttribute("target"),
        type: edge.getAttribute("type") || "buttonEdge",
      })
    );

    setNodes(parsedNodes);
    setEdges(parsedEdges);
  };

  const handleGraphChange = (event) => {
    setSelectedGraph(event.target.value);
  };

  const renderGraphSelector = () => (
    <div className="relative mb-4">
      <select
        onChange={handleGraphChange}
        value={selectedGraph}
        className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500 shadow"
      >
        {Object.keys(graphs).map(graphKey => (
          <option key={graphKey} value={graphKey}>{graphKey}</option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
    </div>
  );


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!selectedGraph) return <div>No Graph Selected</div>;


  return (
    <div className="flex flex-col items-center w-full max-w-screen-xl h-screen mx-auto overflow-auto relative p-5 bg-[#96c1fa]">
      {renderGraphSelector()}

      <div className="w-full h-full" ref={reactFlowWrapper}>
        <div className="button-group mt-4 flex justify-center space-x-4">
          <button
            onClick={createNode}
            className="text-white bg-red-500 hover:bg-black-700 font-bold py-2 px-4 rounded">
            Create Event Node
          </button>
          <button
            onClick={refresh}
            className="text-white bg-red-500 hover:bg-grey-700 font-bold py-2 px-4 rounded">
            Refresh Data
          </button>
          <button
            onClick={() => setIsImportModalOpen(true)}
            className="text-white bg-red-500 hover:bg-grey-700 font-bold py-2 px-4 rounded">
            Import Graph
          </button>
          <button
            onClick={() => setIsFilterModalOpen(true)} // This button triggers the filter modal
            className="text-white bg-red-500 hover:bg-grey-700 font-bold py-2 px-4 rounded">
            Filter Nodes
          </button>
          <ExportGraphData
            nodes={nodesState}
            edges={edgesState}
            projectName={project.name}
          />
        </div>
        <ReactFlow
          nodes={filteredNodes}
          edges={edgesState}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onEdgeUpdate={onEdgeUpdate}
          onNodeContextMenu={onNodeContextMenu}
          onConnect={onConnect}
          fitView
          fitViewOptions={{ padding: 1.0, includeHiddenNodes: true }}>
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
          onClose={handleCreateEventClose}
        />
      )}
      {isEditModalOpen && selectedNode && (
        <EditEventModal
          selectedEvent={selectedNode.data}
          isModalOpen={isEditModalOpen}
          onClose={closeModal}
        />
      )}
      {isImportModalOpen && (
        <ImportGraphModal
          onImport={handleImportedContent}
          onClose={() => setIsImportModalOpen(false)}
          currentProjectName={project.name}
        />
      )}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filterCriteria={filterCriteria}
        setFilterCriteria={setFilterCriteria}
      />
    </div>
  );
};

export default Flow;
