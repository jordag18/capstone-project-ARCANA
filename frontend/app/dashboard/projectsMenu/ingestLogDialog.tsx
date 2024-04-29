import React, { useState, useEffect } from "react";
import { Modal, Button, CloseButton } from "react-bootstrap";
import axios from "axios";

const IngestLogDialog = ({
  show,
  handleCloseDialog,
  setProjectLocation,
  projectLocation,
  setStartDate, // Add this prop
  setEndDate, // Add this prop
}) => {
  //files state variable to store selected files
  const [files, setFiles] = useState<File[] | null>([]);

  //function to handle selection of files by user
  const handleFileInputChange = (e) => {
    const newFiles = e.target.files;
    const newFilesArray = Array.from(newFiles);

    if (newFiles.length > 0) {
      //Add selected files to the current array of files
      setFiles(newFilesArray.concat(files));
    }
  };

  //Removes file selected by user from files state variable
  const handleRemoveFile = (indexToRemove) => {
    setFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  //Function to make APi call to send logs to backend
  const handleIngestLogs = async () => {
    //Object needed to send through API
    const formData = new FormData();

    files.forEach((file) => {
      //Add each file to the FormData object
      formData.append("files", file);
    });

    try {
      //Make API call and get a response
      const response = await axios.post(
        "http://127.0.0.1:8000/api/ingestLogs",
        formData
      );
      console.log(response.data);
      // Assuming this is within the handleIngestLogs function after a successful API call
      setStartDate(formatTimestampForInput(response.data.earliest_timestamp)); // Format and set start date
      setEndDate(formatTimestampForInput(response.data.latest_timestamp)); // Format and set end date
    } catch (error) {
      //If issue with API call catch error
      console.error(error);
    }
  };

  const formatTimestampForInput = (timestamp) => {
    const date = new Date(timestamp);
    return date.toISOString().slice(0, 16); // Trims to 'YYYY-MM-DDThh:mm' format
  };

  // Function to clear all selected files
  const handleClearLogs = () => {
    setFiles([]); // Set files state to an empty array
  };

  //Printing selected files to console
  useEffect(() => {
    console.log(files);
  }, [files]);

  return (
    <Modal show={show} onHide={() => handleCloseDialog("ingestLog")}>
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
              style={{ display: "none" }}
              //onChange is event when the user has selected files or folders to ingest
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
                    <CloseButton
                      className="remove-btn"
                      onClick={() => handleRemoveFile(index)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => handleCloseDialog("ingestLog")}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            handleIngestLogs();
            handleCloseDialog("ingestLog");
          }}>
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
