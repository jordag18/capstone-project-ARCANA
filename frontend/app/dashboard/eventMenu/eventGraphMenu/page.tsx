'use client'
import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges } from 'reactflow';
import 'reactflow/dist/style.css';


const rfStyle = {
  backgroundColor: '#B8CEFF',
  width: '100%', // Set width to 100% of parent container
  height: '100vh', // Set height to 100% of viewport height
};

const Flow = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/api/Tee/graphs`)
      .then(response => response.json())
      .then(data => {
        const fetchedNodes = Object.values(data.nodes).map(node => ({
          id: node.id,
          type: 'default',
          position: { x: 0, y: 0 },
          data: {
            label: `Description: ${node.description}\nLocation: ${node.location}\nInitials: ${node.initials}`, // Display additional info
            value: node.id, // Or any other property you want to display
          },
        }));
        const fetchedEdges = Object.entries(data.edges).flatMap(([source, targets]) => (
          targets.map(target => ({
            id: `${source}-${target}`,
            source,
            target,
          }))
        ));
        console.log("edges: ", fetchedEdges)
        setNodes(fetchedNodes);
        setEdges(fetchedEdges)
      })
      .catch(error => console.error('Error fetching node data:', error));
  }, []);

  const onNodesChange = useCallback(
    changes => setNodes(nds => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    changes => setEdges(eds => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    connection => setEdges(eds => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <div style={{ width: '150%', height: '150vh' }}> {/* Parent container */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        style={rfStyle}
      />
    </div>
  );
};

export default Flow;