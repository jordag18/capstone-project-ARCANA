// CustomEventNode.tsx
import React from 'react';
import { Handle, Position } from 'reactflow';

interface EventNodeData {
  label: string;
  description: string;
  timestamp: string;
  posture: string;
  location: string;
  data_source: string;
  icon: string;
}

interface CustomEventNodeProps {
  data: EventNodeData;
}

const CustomEventNode: React.FC<CustomEventNodeProps> = ({ data }) => (
    <div className="custom-node bg-white border shadow rounded p-2 text-xs"
         style={{
           width: '250px', // Set a fixed width
           maxWidth: '250px', // Ensure the node does not exceed this width
           overflow: 'hidden', // Prevents content from spilling out
           textOverflow: 'ellipsis', // Adds ellipsis if text overflows (applies to single line)
           whiteSpace: 'normal', // Allows text to wrap
         }}>
      <Handle type="target" position={Position.Top} />
      <img src={`${data.icon}`} alt="Event Icon" style={{ width: '100%', height: 'auto', marginBottom: '8px' }} />
      <div><strong>Timestamp:</strong> {data.timestamp}</div>
      <div><strong>Location:</strong> {data.location}</div>
      <div><strong>Posture:</strong> {data.posture}</div>
      <div><strong>Data Source:</strong> {data.data_source}</div>
      <div><strong>Description:</strong> {data.description}</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
);

export default CustomEventNode;