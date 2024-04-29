"use client";
import React, { useState } from "react";
import NavBar from "../../../components/navbar"; // Update the import statement to use lowercase 'navbar'
import Footer from "../../../components/footer";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button"; // Import the Button component

const SyncProjects = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleConnectClick = () => {
    // Add your logic for handling the connect button click
    console.log("Connect button clicked!");
  };

  return (
    <div>
      {/** //<ThemeHandler /> */}
      <div className="flex-fluid min-h-screen flex-col items-center justify-between  mx-auto p-4">
        <Container
          className="d-flex flex-column align-items-center justify-content-center rounded bg-light"
          style={{ width: "800px", height: "500px" }}>
          <h1>Sync Projects</h1>
          <p>Enter an IP Address of your computer to use.</p>
          <p>Use 0.0.0.0 to refer to all IP Addresses of your computer.</p>

          {/* Search Box and Connect Button */}
          <div className="mb-3 d-flex">
            <input
              type="text"
              className="form-control"
              placeholder="0.0.0.0"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              variant="primary"
              onClick={handleConnectClick}
              className="ms-2">
              Connect
            </Button>
          </div>

          <small className="text-muted">
            Hint: Enter the desired IP Address or use 0.0.0.0 for all IP
            Addresses.
          </small>
        </Container>
      </div>
    </div>
  );
};

export default SyncProjects;
