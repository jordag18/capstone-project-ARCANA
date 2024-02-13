import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';


const IngestLogDialog = ({ show, handleCloseDialog, setProjectLocation, projectLocation }) => {

    const handleFileInputChange = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
          // Get the first file (directory) selected by the user
          const selectedDir = files[0].path || files[0].webkitRelativePath;
          setProjectLocation(selectedDir);
          // Handle the selected files (e.g., store them in state)
          console.log('Selected Files:', Array.from(files).map((file) => file.name));
        }
      };


  return (
    <Modal show={show} onHide={() => handleCloseDialog('ingestLog')}>
      <Modal.Header closeButton>
        <Modal.Title>Ingest Logs</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
        <div>
          <p>Select a directory to ingest logs from.</p>
        </div>
        <div>
          <p>Log Directory</p>
        </div>
        <div className="mb-3 d-flex">
          <input
            type="text"
            className="form-control"
            placeholder="ex. /Location/folder"
            value={projectLocation}
            onChange={(e) => setProjectLocation(e.target.value)}
          />
          <label className="btn btn-primary">
            Browse
            <input
              type="file"
              style={{ display: 'none' }}
              onChange={handleFileInputChange}
            />
          </label>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleCloseDialog('ingestLog')}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => handleCloseDialog('ingestLog')}>
          Ingest Logs
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default IngestLogDialog;
