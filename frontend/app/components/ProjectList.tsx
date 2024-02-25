import React, { useEffect, useState } from 'react';

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

    return (
        <div>
            <h2>Projects</h2>
            <ul>
                {projects.map((project, index) => (
                    <li key={index}>
                        <h3>{project.name}</h3>
                        <p>Start Date: {project.start_date || 'Not provided'}</p>
                        <p>End Date: {project.end_date || 'Not provided'}</p>
                        <p>Location: {project.location}</p>
                        <p>Initials: {project.initials}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProjectsList;
