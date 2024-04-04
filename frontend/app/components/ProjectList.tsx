import React, { useEffect, useState } from 'react';
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Link } from 'react-bootstrap-icons';

// Define a type for individual project data
interface Project {
    name: string;
    start_date?: string; // '?' denotes that the field is optional
    end_date?: string;
    location: string;
    initials: string;
}

const ProjectsList: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]); // Use the Project type for state
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [isOpenDialogOpen, setIsOpenDialogOpen] = useState<boolean>(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/projects');
                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.statusText);
                }
                const projectsData: Project[] = await response.json(); // Type assertion
                setProjects(projectsData);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, []);

    // Define what happens when a project button is clicked
    const handleDeleteClick = (project: Project) => {
        setSelectedProject(project);
        setIsDialogOpen(true);
    };

    const handleOpenClick = (project: Project) => {
        setSelectedProject(project);
        setIsOpenDialogOpen(true);
    }

    const handleConfirmDelete = async () => {
        if (selectedProject) {
            try {
                const response = await fetch(`http://localhost:8000/api/deleteProject/${selectedProject.name}`, {
                    method: 'DELETE'
                });
    
                if (!response.ok) {
                    // If the response status code is not okay, throw an error
                    throw new Error('Failed to delete the project');
                }
    
                // Assuming the DELETE was successful, remove the project from the state
                setProjects(projects.filter(project => project.name !== selectedProject.name));
                alert(`Successfully deleted ${selectedProject.name}`);
    
            } catch (error) {
                console.error('Error deleting project:', error);
                alert('Error deleting project');
            }
        }
        setIsDialogOpen(false);  // Close the dialog
        setSelectedProject(null);  // Reset selected project
    };

    const handleConfirmOpen = () => {
        
        if (selectedProject) {
            console.log("Openning Project", selectedProject.name);
            window.location.href = '/${encodeURIComponent(selectedProject.name)}';
        }

        setIsOpenDialogOpen(false);
        return <Link to="/dashboard/eventMenu">  </Link>
        //selectedProject
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setIsOpenDialogOpen(false);
        setSelectedProject(null);
    };


    return (
        <div>
            <hr style={{ height: '2px', backgroundColor: 'black'}}/>
            <ul>
                {projects.map((project, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <div style={{ flex: 1}}>
                            <h3>{project.name}</h3>
                            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                                <p style={{margin: '0 5rem 0 0'}}>Start Date: {project.start_date || 'Not provided'}</p>
                                <p style={{margin: '0 5rem 0 0'}}>End Date: {project.end_date || 'Not provided'}</p>
                                <p style={{margin: '0 5rem 0 0'}}>Location: {project.location}</p>
                                <p style={{margin: '0 5rem 0 0'}}>Initials: {project.initials}</p>
                            </div>
                        </div>
                        <Container className="d-flex justify-content-end">
                            <Button variant="primary" onClick={() => handleOpenClick(project)} style={{ border: 'blue', backgroundColor: 'blue', color: 'white' }} className="me-4">
                                Open
                            </Button>
                            <Button variant="primary" onClick={() => handleDeleteClick(project)} style={{ border: 'red', backgroundColor: 'red', color: 'white' }}>
                                Delete
                            </Button>
                        </Container>
                    </li>
                ))}
            </ul>
            {isDialogOpen && (
                <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', zIndex: 1000 }}>
                    <p>Are you sure you want to delete this project?</p>
                    <Button onClick={handleConfirmDelete} style={{  marginRight: '10px', backgroundColor: 'red', color: 'white'}}>
                        Yes, Delete
                    </Button>
                    <Button onClick={handleCloseDialog}>
                        Cancel
                    </Button>
                </div>
            )}
            {isDialogOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 999 }} onClick={handleCloseDialog}></div>
            )}
            {isOpenDialogOpen && (
                <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', zIndex: 1000 }}>
                    <p>Are you sure you want to open this project?</p>
                    <Button onClick={handleConfirmOpen} style={{  marginRight: '10px', backgroundColor: 'blue', color: 'white'}}>
                        Open
                    </Button>
                    <Button onClick={handleCloseDialog}>
                        Cancel
                    </Button>
                </div>
            )}
            {isOpenDialogOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 999 }} onClick={handleCloseDialog}></div>
            )}
        </div>
    );
};

export default ProjectsList;