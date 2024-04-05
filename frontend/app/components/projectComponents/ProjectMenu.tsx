"use client";
import React, { useEffect, useState } from 'react';
import ProjectDetails from './modify-project-details';
import { Project } from './project-interface';

const ProjectMenu = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/projects', {cache: 'no-store'});
                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.statusText);
                }
                const projectsData: Project[] = await response.json(); // Type assertion
                console.log(projectsData);  //used for testing
                setProjects(projectsData);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();

    }, []);

    return (
    <div className="bg-base-100 rounded-lg shadow">
    <div className="overflow-x-auto rounded-md">
        <table className="table">
        {/* head */}
        <thead className="bg-slate-300 border-b-2 border-slate-500">
            <tr>
            <th className='border-r-2 border-slate-200'>Project</th>
            <th className='border-r-2 border-slate-200'>Start Date</th>
            <th className='border-r-2 border-slate-200'>End Date</th>
            <th className='border-r-2 border-slate-200'>Location</th>
            <th className='border-r-2 border-slate-200'>Analyst</th>
            <th></th>
            </tr>
        </thead>
        <tbody className="bg-slate-50">
            {projects.map((project, index) => (
                <tr key={index} className='hover:bg-slate-200 '>
                    <td>{project.name}</td> {/* Each <td> is a cell for the project's attribute */}
                    <td>{project.start_date}</td>
                    <td>{project.end_date}</td>
                    <td>{project.location}</td>
                    <td>{project.initials}</td>
                    <td> {/* New <td> for the details component */}
                        <ProjectDetails
                            selectedProject={project}

                        />
                    </td>
                </tr>
            ))}
        </tbody>
        </table>
    </div>
    </div>
    )
}

export default ProjectMenu