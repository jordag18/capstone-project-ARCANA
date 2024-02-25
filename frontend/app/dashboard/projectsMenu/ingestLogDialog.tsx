import React, { useState , useEffect} from 'react';
import { Modal, Button, CloseButton } from 'react-bootstrap';
import axios from 'axios';



const IngestLogDialog = ({ show, handleCloseDialog, setProjectLocation, projectLocation }) => {

    const [files, setFiles] = useState<File[] | null>([]);

    const [filesDir, setFilesDir] = useState('');

    const handleFileInputChange = (e) => {
        const newFiles = e.target.files;
        const newFilesArray= Array.from(newFiles)

        if (newFiles.length > 0) {
          setFiles(newFilesArray.concat(files));
        }
      };

      const handleRemoveFile = (indexToRemove) => {
        setFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove));
      };

      const handleIngestLogs = async () => {
        // Create an array of file names
        const fileNames = files.map(file => file.name);
    
        try {
            // Make the API call using axios
            const response = await axios.post('http://127.0.0.1:8000/api/ingestLogs', { files: fileNames }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            console.log(response.data);
            // Handle success, if needed
        } catch (error) {
            console.error(error);
            // Handle error, if needed
        }
    };
    
      useEffect(() => {
        console.log(files); // Access the updated value here
      }, [files]); // Specify "value" as the dependency
      

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
                  <CloseButton className='remove-btn' onClick={() => handleRemoveFile(index)}></CloseButton>
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
      </Modal.Footer>
    </Modal>
  );
};

export default IngestLogDialog;
