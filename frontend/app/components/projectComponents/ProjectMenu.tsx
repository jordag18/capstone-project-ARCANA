"use client";
import React, { useEffect, useState } from "react";
import ProjectDetails from "./modify-project-button";
import { Project } from "./project-interface";
import { useProject } from "@/app/contexts/ProjectContext";

interface ProjectMenuProps {
  refreshProjects: () => void; // to refresh projects
}

const ProjectMenu: React.FC<ProjectMenuProps> = ({ refreshProjects }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const { project, setProject } = useProject();
  const [openProjectId, setOpenProjectId] = useState<string | null>(null);

  const toggleProjectDetails = (projectId: string) => {
    setOpenProjectId(openProjectId === projectId ? null : projectId);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log("First Time");
        const response = await fetch("http://localhost:8000/api/projects", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(
            "Network response was not ok: " + response.statusText
          );
        }

        const projectsData: Project[] = await response.json(); // Type assertion
        console.log("Loaded Projects:", projectsData); //used for testing

        if (projectsData.length > 0) {
          setProject(projectsData[0]); //Sets the active project as the first project grabbed from the db unless other project is selected by user
        }

        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching projects:", error);
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
              <th className="border-r-2 border-slate-200">Project</th>
              <th className="border-r-2 border-slate-200">Start Date</th>
              <th className="border-r-2 border-slate-200">End Date</th>
              <th className="border-r-2 border-slate-200">Location</th>
              <th className="border-r-2 border-slate-200">Analyst</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="bg-slate-50">
            {projects.map((project, index) => (
              <tr key={index} className="hover:bg-slate-200 ">
                <td>{project.name}</td>
                {/* Each <td> is a cell for the project's attribute */}
                <td>{project.start_date}</td>
                <td>{project.end_date}</td>
                <td>{project.location}</td>
                <td>{project.initials}</td>
                <td>
                  {/* New <td> for the details component */}
                  <ProjectDetails
                    selectedProject={project}
                    refreshProjects={refreshProjects}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectMenu;
