import React, { useEffect, useState } from 'react';
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
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

    const handleConfirmDelete = () => {
        setIsDialogOpen(false);
        setSelectedProject(null);
        // Here you would also call the API to delete the project and then refresh the list of projects
    };

    const handleConfirmOpen = () => {
        // Logic to delete the project
        setIsOpenDialogOpen(false);
        setSelectedProject(null);
        // Here you would also call the API to delete the project and then refresh the list of projects
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setIsOpenDialogOpen(false);
        setSelectedProject(null);
    };


    return (
        <div>
            <h2>Projects</h2>
            <ul>
                {projects.map((project, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <div style={{ flex: 1 }}>
                        <h3>{project.name}</h3>
                            <p>Start Date: {project.start_date || 'Not provided'}</p>
                            <p>End Date: {project.end_date || 'Not provided'}</p>
                            <p>Location: {project.location}</p>
                            <p>Initials: {project.initials}</p>
                        </div>
                        <Container className="d-flex justify-content-end">
                            <Button variant="primary" onClick={() => handleOpenClick(project)} style={{ backgroundColor: 'blue', color: 'white' }}>
                                Open
                            </Button>
                            <Button variant="primary" onClick={() => handleDeleteClick(project)} style={{ backgroundColor: 'red', color: 'white' }}>
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