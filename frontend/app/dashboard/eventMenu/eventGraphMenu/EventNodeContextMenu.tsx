// EventNodeContextMenu.js

import React, { forwardRef, useMemo } from 'react';
import "./eventNodeMenu.css";

const EventNodeContextMenu = forwardRef(({ node, onClose, style, onEdit }, ref) => {
  // Memoized callback to ensure they are not recreated every render unless necessary
  const handleEdit = useMemo(() => {
    return () => {
      if (typeof onEdit === 'function') {
        onEdit(node);
      } else {
        console.error('onEdit is not a function');
      }
    };
  }, [node, onEdit]);

  const handleClose = useMemo(() => {
    return () => {
      if (typeof onClose === 'function') {
        onClose();
      } else {
        console.error('onClose is not a function');
      }
    };
  }, [onClose]);

  return (
    <div className="context-menu" ref={ref} style={style}>
      <ul>
        <li onClick={handleEdit}>Edit Event Node</li>
        <li onClick={() => { console.log('Delete:', node); handleClose(); }}>Delete Event Node</li>
        <li onClick={() => { console.log('Link:', node); handleClose(); }}>Link to Another Event Node</li>
        <li onClick={() => { console.log('View:', node); handleClose(); }}>View Event Node Information</li>
        <li onClick={handleClose}>Close Menu</li>
      </ul>
    </div>
  );
});

export default EventNodeContextMenu;


//Need to add @app.delete("/api/deleteEvent/{project_name}/{event_id}") API call


