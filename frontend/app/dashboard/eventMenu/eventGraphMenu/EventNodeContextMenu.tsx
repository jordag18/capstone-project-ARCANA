// EventNodeContextMenu.js

import React, { forwardRef } from 'react';
import "./eventNodeMenu.css";

const EventNodeContextMenu = forwardRef(({ node, onClose, style, onEdit }, ref) => {
  // Use 'ref' as a ref attribute on the root element of the returned JSX
  return (
    <div className="context-menu" ref={ref} style={style}>
      <ul>
        <li onClick={() => onEdit(node)}>Edit Event Node</li>
        <li onClick={() => { console.log('Delete:', node); onClose(); }}>Delete Event Node</li>
        <li onClick={() => { console.log('Link:', node); onClose(); }}>Link to Another Event Node</li>
        <li onClick={() => { console.log('View:', node); onClose(); }}>View Event Node Information</li>
        <li onClick={onClose}>Close Menu</li>
      </ul>
    </div>
  );
});

export default EventNodeContextMenu;


