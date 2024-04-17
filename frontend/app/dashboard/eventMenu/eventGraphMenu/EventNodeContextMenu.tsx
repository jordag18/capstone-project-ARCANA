import React, { useState, useEffect } from 'react';
import "./eventNodeMenu.css";

const EventNodeContextMenu = ({ node, onClose, style }) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.defaultPrevented) {
        return; // Don't do anything if the event was already handled
      }
      // Check if the click is outside the menu
      if (!event.target.closest('.context-menu')) {
        onClose(); // Close the menu
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Cleanup the listener when the component unmounts
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  if (!node) return null;

  return (
    <div className="context-menu" style={style}>
      <ul>
        <li onClick={() => { console.log('Edit:', node); onClose(); }}>Edit Event Node</li>
        <li onClick={() => { console.log('Delete:', node); onClose(); }}>Delete Event Node</li>
        <li onClick={() => { console.log('Link:', node); onClose(); }}>Link to Another Event Node</li>
        <li onClick={() => { console.log('View:', node); onClose(); }}>View Event Node Information</li>
      </ul>
    </div>
  );
};

export default EventNodeContextMenu;
