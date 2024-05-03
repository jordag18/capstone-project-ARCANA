// CustomEventNode.tsx
import React from "react";
import { Handle, Position } from "reactflow";

interface EventNodeData {
  label: string;
  initials: string;
  description: string;
  timestamp: string;
  posture: string;
  location: string;
  data_source: string;
  icon: string;
  vector_id: string;
  team: string;
  source_host: string;
  target_host_list: string;
}

interface CustomEventNodeProps {
  data: EventNodeData;
}

const CustomEventNode: React.FC<CustomEventNodeProps> = ({ data }) => (
  <div
    className="custom-node bg-gradient-to-r from-blue-100 to-blue-50 border border-blue-300 shadow-xl rounded-lg p-4 text-sm space-y-2"
    style={{
      width: "300px",
      maxWidth: "300px",
      overflow: "hidden",
      boxShadow: '0 10px 15px rgba(0, 0, 0, 0.2)'
    }}>
    <Handle type="target" position={Position.Top} style={{ backgroundColor: 'rgba(30, 144, 255, 0.9)' }} />
    <div className="flex justify-center items-center space-x-3">
      <img
        src={`/Icons/${data.icon}`}
        alt="Event Icon"
        style={{ width: '150px', height: '150px', borderRadius: '50%' }} // Ensuring the icon is circular
      />
    </div>
    <div className="text-gray-800 text-center">
      <div><strong>Initials:</strong> {data.initials}</div>
      <div><strong>Team:</strong> {data.team}</div>
      <div><strong>Timestamp:</strong> {data.timestamp}</div>
      <div><strong>Location:</strong> {data.location}</div>
      <div><strong>Posture:</strong> {data.posture}</div>
      <div><strong>Data Source:</strong> {data.data_source}</div>
      <div><strong>Vector ID:</strong> {data.vector_id}</div>
      <div><strong>Source Host:</strong> {data.source_host}</div>
      <div><strong>Target Hosts:</strong> {data.target_host_list}</div>
      <div><strong>Description:</strong> {data.description}</div>
    </div>
    <Handle type="source" position={Position.Bottom} style={{ backgroundColor: 'rgba(34, 139, 34, 0.9)' }} />
  </div>
);

export default CustomEventNode;