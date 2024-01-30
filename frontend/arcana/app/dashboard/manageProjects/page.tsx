"use client";
import React, { useState } from "react";
import NavBar from "../../components/navbar"; // Update the import statement to use lowercase 'navbar'
import Footer from "../../components/footer";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
//import ThemeHandler from "@/app/util/themeHandler";
//import FontSizeHandler from "@/app/lib/fontSizeHandler";

const ManageProjectsPage = () => {

  const [projectName, setProjectName] = useState('');
  const [projectLocation, setProjectLocation] = useState('');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [initials, setInitials] = useState('');

  const [showDialog, setShowDialog] = useState(false);

  const handleOpenDialog = () => {
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  return (
    <div>
      {/* //<ThemeHandler /> */}
      <NavBar />
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <Container
          className="d-flex justify-content-center align-items-center position-absolute top-50 start-50 translate-middle rounded bg-light"
          style={{ width: "800px", height: "500px" }}>
          <h1>Manage Projects</h1>
          <Button variant="primary" onClick={handleOpenDialog}>+ Create Project</Button>

          {/* Create Project Dialog */}
          <Modal show={showDialog} onHide={handleCloseDialog}>
            <Modal.Header closeButton>
              <Modal.Title>Create Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="mb-3 d-flex">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Project Name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>
              <div className="mb-3 d-flex">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Project Location"
                  value={projectName}
                  onChange={(e) => setProjectLocation(e.target.value)}
                />
              </div>
              <div className="mb-3 d-flex">
                <input
                  type="text"
                  className="form-control"
                  placeholder="mm/dd/yyyy"
                  value={projectName}
                  onChange={(e) => setDateStart(e.target.value)}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="mm/dd/yyyy"
                  value={projectName}
                  onChange={(e) => setDateEnd(e.target.value)}
                />
              </div>
              <div className="mb-3 d-flex">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Initials"
                  value={projectName}
                  onChange={(e) => setInitials(e.target.value)}
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseDialog}>Cancel</Button>
              <Button variant="primary" onClick={handleCloseDialog}>Create Project</Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </div>
      <Footer />
    </div>
  );
};
export default ManageProjectsPage;
