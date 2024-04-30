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
    className="custom-node bg-white border shadow rounded p-2 text-xs"
    style={{
      width: "250px", // Set a fixed width
      maxWidth: "250px", // Ensure the node does not exceed this width
      height: "800px",
      overflow: "hidden", // Prevents content from spilling out
      textOverflow: "ellipsis", // Adds ellipsis if text overflows (applies to single line)
      whiteSpace: "normal", // Allows text to wrap
    }}>
    <Handle type="target" position={Position.Top} />
    <img
      src={`${data.icon}`}
      alt="Event Icon"
      style={{ width: "30%", height: "10%", marginBottom: "8px" }}
    />
    <div>
      <strong>Initials:</strong> {data.initials}
    </div>
    <div>
      <strong>Team:</strong> {data.team}
    </div>
    <div>
      <strong>Timestamp:</strong> {data.timestamp}
    </div>
    <div>
      <strong>Location:</strong> {data.location}
    </div>
    <div>
      <strong>Posture:</strong> {data.posture}
    </div>
    <div>
      <strong>Data Source:</strong> {data.data_source}
    </div>
    <div>
      <strong>Vector ID:</strong> {data.vector_id}
    </div>
    <div>
      <strong>Source Host:</strong> {data.source_host}
    </div>
    <div>
      <strong>Target Host:</strong> {data.target_host_list}
    </div>
    <div>
      <strong>Description:</strong> {data.description}
    </div>
    <Handle type="source" position={Position.Bottom} />
  </div>
);

export default CustomEventNode;
