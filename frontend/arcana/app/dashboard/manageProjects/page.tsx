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

  const [showCreateProjectDialog, setShowCreateProjectDialog] = useState(false);
  const [showIngestLogDialog, setShowIngestLogDialog] = useState(false);
  const [showDeleteProjectDialog, setShowDeleteProjectDialog] = useState(false);

  const handleOpenDialog = (dialogType: string) => {
    switch (dialogType) {
      case 'createProject':
        setShowCreateProjectDialog(true);
        break;
      case 'ingestLog':
        setShowIngestLogDialog(true);
        break;
      case 'deleteProject':
        setShowDeleteProjectDialog(true);
        break;
      default:
        break;
    }
  };

  const handleCloseDialog = (dialogType: string) => {
    switch (dialogType) {
      case 'createProject':
        setShowCreateProjectDialog(false);
        break;
      case 'ingestLog':
        setShowIngestLogDialog(false);
        break;
      case 'deleteProject':
        setShowDeleteProjectDialog(false);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      {/* //<ThemeHandler /> */}
      <NavBar />
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <Container
          className="d-flex flex-column justify-content-between"
          style={{ width: "800px", height: "500px" }}>
          <div>
            <Container className="d-flex justify-content-between align-items-center">
              <h1>Manage Projects</h1>
              <Button variant="primary" onClick={() => handleOpenDialog('createProject')}>+ Create Project</Button>
            </Container>
          </div>

          

          <div>
            <Container className="d-flex justify-content-between">
              <Button variant="primary" onClick={() => handleOpenDialog('ingestLog')}>Ingest Log</Button>
              <Button variant="primary" onClick={() => handleOpenDialog('deleteProject')}>Delete Project</Button>
              <Button variant="primary">Open Project</Button>
            </Container>
          </div>
        

          {/* Create Project Dialog */}
          <Modal show={showCreateProjectDialog} onHide={() => handleCloseDialog('createProject')}>
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
                  value={projectLocation}
                  onChange={(e) => setProjectLocation(e.target.value)}
                />
              </div>
              <div className="mb-3 d-flex">
                <input
                  type="text"
                  className="form-control"
                  placeholder="mm/dd/yyyy"
                  value={dateStart}
                  onChange={(e) => setDateStart(e.target.value)}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="mm/dd/yyyy"
                  value={dateEnd}
                  onChange={(e) => setDateEnd(e.target.value)}
                />
              </div>
              <div className="mb-3 d-flex">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Initials"
                  value={initials}
                  onChange={(e) => setInitials(e.target.value)}
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => handleCloseDialog('createProject')}>Cancel</Button>
              <Button variant="primary" onClick={() => handleCloseDialog('createProject')}>Create Project</Button>
            </Modal.Footer>
          </Modal>

          {/* Ingest Log Dialog */}
          <Modal show={showIngestLogDialog} onHide={() => handleCloseDialog('ingestLog')}>
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
                <Button variant="primary">Browse</Button>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => handleCloseDialog('ingestLog')}>Cancel</Button>
              <Button variant="primary" onClick={() => handleCloseDialog('ingestLog')}>Ingest Logs</Button>
            </Modal.Footer>
          </Modal>

          {/* Delete Project Dialog */}
          <Modal show={showDeleteProjectDialog} onHide={() => handleCloseDialog('deleteProject')}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
              <h1>Are you sure you want to delete ?</h1>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => handleCloseDialog('deleteProject')}>Cancel</Button>
              <Button variant="primary" onClick={() => handleCloseDialog('deleteProject')}>Delete</Button>
            </Modal.Footer>
          </Modal>

        </Container>
      </div>
      <Footer />
    </div>
  );
};
export default ManageProjectsPage;
