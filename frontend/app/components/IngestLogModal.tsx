"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const IngestLogModal = ({
  setProjectLocation,
  setStartDate, // Add this prop
  setEndDate, // Add this prop
}) => {
  //files state variable to store selected files
  const [files, setFiles] = useState<File[]>([]);

  //function to handle selection of files by user
  const handleFileInputChange = (
    logFiles: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newFiles = logFiles.target.files;

    if (newFiles && newFiles.length > 0) {
      const newFilesArray = Array.from(newFiles).filter((file) =>
        file.name.endsWith(".csv")
      );
      //Add selected files to the current array of files
      setFiles((prevFiles) => [...prevFiles, ...newFilesArray]);
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
    <>
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_2").showModal()}>
        Ingest Logs
      </button>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Ingest Logs</h3>
          <p className="py-4">Select target directory</p>
          <div className="mb-3 d-flex space-y-2">
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="form-control"
                placeholder="ex. /Location/folder"
                onChange={(e) => setProjectLocation(e.target.value)}
              />
            </label>
            <label className="btn">
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
          <div className="divider"></div>
          <div>
            {files.length > 0 && (
              <div>
                <p>Selected Files:</p>
                <ul>
                  {files.map((file, index) => (
                    <li key={index}>
                      {file.name}
                      <button
                        className="btn-sm"
                        onClick={() => handleRemoveFile(index)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="divider"></div>
          <div className="mb-3 d-flex space-x-2">
            <button
              className="btn"
              onClick={() => {
                handleIngestLogs();
                document.getElementById("my_modal_2").close();
              }}>
              Ingest Logs
            </button>
            <button
              className="btn bg-red-600 text-white"
              onClick={handleClearLogs}>
              Clear Logs
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default IngestLogModal;
