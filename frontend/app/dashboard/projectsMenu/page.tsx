"use client";
import React, { useState } from "react";
import NavBar from "../../components/navbar"; // Update the import statement to use lowercase 'navbar'
import Footer from "../../components/footer";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/esm/Row";
import { Folder2 } from "react-bootstrap-icons";
import Stack from "react-bootstrap/esm/Stack";
import IngestLogDialog from "./ingestLogDialog"; // Import the IngestLogDialog component
import ProjectsList from "@/app/components/ProjectList";


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


  const handleSubmit = async () => {
    const projectData = {
        name: projectName,
        start_date: dateStart,
        end_date: dateEnd,
        location: projectLocation,
        initials: initials
    };

    try {
      console.log('Sending project data:', projectData);
        const response = await fetch('http://localhost:8000/api/project/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectData)
        });

        if (!response.ok) {
            throw new Error('Failed to create the project');
        }
        const newProject = await response.json();
        console.log('Successfully created project:', newProject);
        // Close the modal and clear the form
        handleCloseDialog('createProject');
        // Optionally, refresh the list of projects or add the new project to the state
    } catch (error) {
        console.error('Error creating project:', error);
        alert(`Error creating project: ${error.message}`);
    }
};


  return (
    <div>
      {/* //<ThemeHandler /> */}
      <NavBar />
      <div
        className="flex justify-content-center align-items-center position-absolute top-50 start-50 translate-middle p-2 rounded-full bg-auto "
        style={{ height: "75%", width: "100%" }}>
        <Container className="flex justify-content-center align-items-center border mx-auto p-3 rounded">
          <div className="justify-content-space-between">
            <Row className="justify-content-center align-items-center p-2 mx-auto">
              <div className="d-flex align-items-center p-2">
                {" "}
                {/* Changed class to 'd-flex' for inline display */}
                <Folder2 size={80} />
                <h2 className="mx-3 p-3 align-middle">Manage Projects</h2>
                <Container className="d-flex justify-content-end">
                  <Button variant="primary" onClick={() => handleOpenDialog('createProject')}> + Create Project </Button>
                </Container>
              </div>
            </Row>
          </div>
        {/* Original Open, Create, and Delete buttons, commented out for now. Currently using open and delete buttons provided by ProjectList.tsx
          <div>
            <Button variant="primary" onClick={() => handleOpenDialog('createProject')}> + Create Project </Button>
          </div>

          {/* Original Open and Delete buttons, commented out for now. Currently using open and delete buttons provided by ProjectList.tsx
          <div>
            <Container className="d-flex justify-content-between">
              <Button variant="primary" onClick={() => handleOpenDialog('deleteProject')}>Delete Project</Button>
              <Button variant="primary">Open Project</Button>
            </Container>
          </div>
        */}


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
                  type="date"
                  className="form-control"
                  placeholder="mm/dd/yyyy"
                  value={dateStart}
                  onChange={(e) => setDateStart(e.target.value)}
                />
                <input
                  type="date"
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
              <Button variant="primary" onClick={() => handleOpenDialog('ingestLog')}>Ingest Log</Button>
              <Button variant="primary" onClick={handleSubmit}>Create Project</Button>
            </Modal.Footer>
          </Modal>


          {/* Ingest Log Dialog */}
          <IngestLogDialog
            show={showIngestLogDialog}
            handleCloseDialog={handleCloseDialog}
            setProjectLocation={setProjectLocation}
          />


          {/* Delete Project Dialog */}
          <Modal show={showDeleteProjectDialog} onHide={() => handleCloseDialog('deleteProject')}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body style={{ textAlign: 'center' }}>
              <h3> Are you sure you want to delete? </h3>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => handleCloseDialog('deleteProject')}>Cancel</Button>
              <Button variant="danger" onClick={() => handleCloseDialog('deleteProject')}>Delete</Button>
            </Modal.Footer>
          </Modal>
          <div className="justify-content-end">
          <ProjectsList />
          </div>

        </Container>
      </div>
      <Footer />
    </div>
  );
};
export default ManageProjectsPage;
