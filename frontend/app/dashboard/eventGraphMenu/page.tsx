//Testing page to see that it is getting the graph details correctly
'use client'
import React, { useEffect, useState } from 'react';

const GraphPage = () => {
  const [graphs, setGraphs] = useState([]);
  const project_name = "Project2"; // Replace "your_project_name" with your actual project name

  useEffect(() => {
    // Fetch data from your API when the component mounts
    fetchGraphs();
  }, []);

  const fetchGraphs = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/${project_name}/graphs`);
      const data = await response.json();
      const formattedGraphs = formatTimestamps(data.graph);
      setGraphs(formattedGraphs);
    } catch (error) {
      console.error('Error fetching graphs:', error);
    }
  };

  // Function to format timestamps in the graph data
  const formatTimestamps = (graphData) => {
    const formattedData = {};
    for (const root in graphData) {
      formattedData[root] = graphData[root].map((node) => ({
        ...node,
        timestamp: new Date(node.timestamp).toLocaleString() 
      }));
    }
    return formattedData;
  };

  return (
    <div>
      <h1>Graphs</h1>
      <div>
        {Object.keys(graphs).map((root) => (
          <div key={root}>
            <h2>Root: {root}</h2>
            <ul>
              {graphs[root].map((node) => (
                <li key={node.id}>
                  <h3>{node.action_title}</h3>
                  <p>{node.description}</p>
                  <p>Timestamp: {node.timestamp}</p> 
                  <p>{node.initials}</p> 
                  <p>{node.team}</p>
                  <p>{node.vector_id}</p> 
                  <p>{node.source_host}</p> 
                  <p>{node.target_host}</p> 
                  <p>{node.location}</p> 
                  <p>{node.posture}</p> 
                  <p>{node.is_malformed}</p> 
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GraphPage;

