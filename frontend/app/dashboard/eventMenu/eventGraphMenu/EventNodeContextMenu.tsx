import React, { forwardRef } from "react";
import "./eventNodeMenu.css";

interface EventNodeContextMenuProps {
  node: any; // Consider defining a specific type for the node
  onClose: () => void;
  onEdit: (node: any) => void;
  onDelete: (node: any) => void;
  style: React.CSSProperties;
}

const EventNodeContextMenu = forwardRef<
  HTMLDivElement,
  EventNodeContextMenuProps
>(({ node, onClose, onEdit, onDelete, style }, ref) => {
  return (
    <div className="context-menu" ref={ref} style={style}>
      <ul>
        <li
          onClick={() => {
            onEdit(node);
          }}>
          Edit Event Node
        </li>
        <li
          onClick={() => {
            onDelete(node);
            onClose();
          }}>
          Delete Event Node
        </li>
        <li onClick={onClose}>Close Menu</li>
      </ul>
    </div>
  );
});

export default EventNodeContextMenu;
