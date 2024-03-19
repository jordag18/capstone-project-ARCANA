import React, { useState , useEffect} from 'react';
import { Modal, Button, CloseButton } from 'react-bootstrap';
import axios from 'axios';



const IngestLogDialog = ({ show, handleCloseDialog, setProjectLocation, projectLocation }) => {
  const [files, setFiles] = useState<File[] | null>([]);

  const handleFileInputChange = (e) => {
      const newFiles = e.target.files;
      const newFilesArray = Array.from(newFiles);

      if (newFiles.length > 0) {
          setFiles(newFilesArray.concat(files));
      }
  };

  const handleRemoveFile = (indexToRemove) => {
      setFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove));
  };

  const handleIngestLogs = async () => {
      const formData = new FormData();
      
      files.forEach((file) => {
          formData.append('files', file);
      });
  
      try {
          const response = await axios.post('http://127.0.0.1:8000/api/ingestLogs', formData);
          console.log(response.data);
      } catch (error) {
          console.error(error);
      }
  };

  // Function to clear all selected files
  const handleClearLogs = () => {
      setFiles([]); // Set files state to an empty array
  };

  useEffect(() => {
      console.log(files);
  }, [files]);

  return (
      <Modal show={show} onHide={() => handleCloseDialog('ingestLog')}>
          <Modal.Header closeButton>
              <Modal.Title>Ingest Logs</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <div>
                  <p>Select a directory to ingest logs from.</p>
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
                          webkitdirectory="true"
                          directory="true"
                          multiple
                      />
                  </label>
              </div>
              <div>
                  {files.length > 0 && (
                      <div>
                          <p>Selected Files:</p>
                          <ul>
                              {files.map((file, index) => (
                                  <li key={index}>
                                      {file.name}
                                      <CloseButton className='remove-btn' onClick={() => handleRemoveFile(index)} />
                                  </li>
                              ))}
                          </ul>
                      </div>
                  )}
              </div>
          </Modal.Body>
          <Modal.Footer>
              <Button variant="secondary" onClick={() => handleCloseDialog('ingestLog')}>
                  Cancel
              </Button>
              <Button variant="primary" onClick={() => { handleIngestLogs(); handleCloseDialog('ingestLog'); }}>
                  Ingest Logs
              </Button>
              {/* Clear Logs Button */}
              <Button variant="danger" onClick={handleClearLogs}>
                  Clear Logs
              </Button>
          </Modal.Footer>
      </Modal>
  );
};

export default IngestLogDialog;