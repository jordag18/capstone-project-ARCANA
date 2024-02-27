"use client";
import React, { useState, useEffect } from "react";
import NavBar from "../../components/navbar"; // Update the import statement to use lowercase 'navbar'
import Footer from "../../components/footer";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from 'axios'

const ManageProjectsPage = () => {

  const [projectList, setProjectList] = useState([{}])
  const [project_name, setProjectTitle] = useState('')

  // read all projects found within projectList in ARCANA database
  useEffect(() => {
    axios.get<Project[]>('http://127.0.0.1:8000/api/project')
      .then(res => {
        setProjectList(res.data);
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
      });
  }, []);



  const [projectName, setProjectName] = useState('');
  const [projectLocation, setProjectLocation] = useState('');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [initials, setInitials] = useState('');

  const createProjectHandler = () => {
    // Perform validation checks on the input values
    if (projectName.trim() === '') {
      console.error('Project name is required');
      return;
    }
    if (projectLocation.trim() === '') {
      console.error('Project location is required');
      return;
    }
    if (dateStart.trim() === '') {
      console.error('Start date is required');
      return;
    }
    if (dateEnd.trim() === '') {
      console.error('End date is required');
      return;
    }
    if (initials.trim() === '') {
      console.error('Initials are required');
      return;
    }

    // Create the project object
    const newProject = {
      projectName,
      projectLocation,
      dateStart,
      dateEnd,
      initials
    };

    // Send a POST request to the API endpoint
    axios.post('http://127.0.0.1:8000/api/project', newProject)
      .then(res => {
        console.log('Project created successfully:', res.data);
        // Reset the input values
        setProjectName('');
        setProjectLocation('');
        setDateStart('');
        setDateEnd('');
        setInitials('');
        // Close the create project dialog
        handleCloseDialog('createProject');
      })
      .catch(error => {
        console.error('Error creating project:', error);
      });
  };

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
            <ul>
              <li>Project A</li>
              <li>Project B</li>
              <li>Project C</li>
            </ul>
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
              <Button variant="primary" onClick={() => handleCloseDialog('createProject')}>Create Project</Button>
              <Button variant="primary" onClick={() => handleOpenDialog('ingestLog')}>Ingest Log</Button>

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
