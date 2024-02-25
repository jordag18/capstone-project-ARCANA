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
              </div>
            </Row>
          </div>
          <div className="justify-content-end">
          <ProjectsList />
            <Button variant="primary" onClick={() => handleOpenDialog('createProject')}> + Create Project </Button>
          </div>

          <Stack gap={3} className="p-4 mx-8 d-flex align-self-center justify-content-sm-start">
            <Button className="p-3 justify-content-start text-start outline-secondary" variant="outline-secondary" >
              Project A
            </Button>

            <Button className="p-3 justify-content-start text-start outline-secondary" variant="outline-secondary" >
              Project B
            </Button>

            <Button className="p-3 justify-content-start text-start outline-secondary" variant="outline-secondary" >
              Project C
            </Button>

            <Button className="p-3 justify-content-start text-start outline-secondary" variant="outline-secondary" >
              Project D
            </Button>
        </Stack>

          <div>
            <Container className="d-flex justify-content-between">
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
              <Button variant="primary" onClick={() => handleOpenDialog('ingestLog')}>Ingest Log</Button>
              <Button variant="primary" onClick={() => handleCloseDialog('createProject')}>Create Project</Button>
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

        </Container>
      </div>
      <Footer />
    </div>
  );
};
export default ManageProjectsPage;
