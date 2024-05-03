import React from "react";
import DeleteButton from "./project-details-delete-button";
import { Project } from "./project-interface";
import { useProject } from "@/app/contexts/ProjectContext";
import { useRouter } from "next/navigation";

interface ProjectDetailsProps {
  selectedProject: Project;
  refreshProjects: () => void;
}
const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  selectedProject,
  refreshProjects,
}) => {
  const { setProject } = useProject();
  const router = useRouter();

  const handleOpenClick = () => {
    setProject(selectedProject);
    router.push("/dashboard/eventMenu");
  };

  return (
    <details className="dropdown dropdown-left dropdown-end">
      <summary className="m-1 btn">Modify</summary>
      <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-24">
        <li>
          <button
            onClick={handleOpenClick}
            className="btn bg-sky-500 text-white hover:bg-sky-600">
            Open
          </button>
        </li>
        <li>
          <DeleteButton
            selectedProject={selectedProject}
            refreshProjects={refreshProjects}
          />
        </li>
      </ul>
    </details>
  );
};

export default ProjectDetails;
