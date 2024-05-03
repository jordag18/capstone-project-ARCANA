import React from "react";
import { Project } from "./project-interface";

interface DeleteButtonProps {
  selectedProject: Project;
  refreshProjects: () => void;
}
const DeleteButton: React.FC<DeleteButtonProps> = ({
  selectedProject,
  refreshProjects,
}) => {
  const handleConfirmDelete = async () => {
    try {
      console.log("Project Name:", selectedProject.name);
      const response = await fetch(
        `http://localhost:8000/api/deleteProject/${selectedProject.name}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        // If the response status code is not okay, throw an error
        throw new Error("Failed to delete the project");
      }

      // Assuming the DELETE was successful, remove the project from the state
      // setProjects(projects.filter(project => project.name !== projectName));
      alert(`Successfully deleted ${selectedProject.name}`);
      refreshProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Error deleting project");
    }

    // setSelectedProject(null);  // Reset selected project
  };

  return (
    <button
      className="btn bg-red-500 text-white hover:bg-red-400"
      onClick={handleConfirmDelete}>
      Delete
    </button>
  );
};

export default DeleteButton;
