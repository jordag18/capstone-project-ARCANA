"use client";
import React, { useState, useEffect } from "react";
import IngestLogModal from "../IngestLogModal";
import axios from 'axios'

//passes refresh trigger to main project menu page to refresh the table
interface CreateProjectModalProps {
  onProjectCreated: () => void;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  onProjectCreated,
}) => {
  // these are to reset the fields after a project is reloaded
  const initialInputState = {
    projectName: "",
    projectLocation: "",
    dateStart: "",
    dateEnd: "",
    initials: "",
  };

  const resetForm = () => {
    setProjectName(initialInputState.projectName);
    setProjectLocation(initialInputState.projectLocation);
    setDateStart(initialInputState.dateStart);
    setDateEnd(initialInputState.dateEnd);
    setInitials(initialInputState.initials);
  };

  const [projectName, setProjectName] = useState(initialInputState.projectName);
  const [projectLocation, setProjectLocation] = useState(
    initialInputState.projectLocation
  );
  const [dateStart, setDateStart] = useState(initialInputState.dateStart);
  const [dateEnd, setDateEnd] = useState(initialInputState.dateEnd);
  const [initials, setInitials] = useState('');

  // Function to fetch initials from the API
  const fetchInitials = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/getInitials');
      setInitials(response.data.initials);  // Assuming the API returns an object with an 'initials' field
    } catch (error) {
      console.error('Failed to fetch initials:', error);
    }
  };

  // Fetch initials when the component mounts
  useEffect(() => {
    fetchInitials();
  }, []);

  const handleSubmit = async () => {
    const projectData = {
      name: projectName,
      start_date: dateStart,
      end_date: dateEnd,
      location: projectLocation,
      initials: initials,
    };

    try {
      console.log("Sending project data:", projectData);
      const response = await fetch("http://localhost:8000/api/project/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error("Failed to create the project");
      }
      const newProject = await response.json();
      console.log("Successfully created project:", newProject);
      onProjectCreated(); //succeful project creation triggers refresh
      resetForm();
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error creating project:", error.message);
        alert(`Error creating project: ${error.message}`);
      }
    }

    // revalidatePath("/dashboard/projectsMenu");
  };

  return (
    <>
      <dialog id="create_projet_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="flex flex-col space-y-4">
            <h3 className="font-bold text-lg">Create Project</h3>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow"
                placeholder="Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow"
                placeholder="Location"
                value={projectLocation}
                onChange={(e) => setProjectLocation(e.target.value)}
              />
            </label>
            <div className="mb-3 d-flex space-y-4">
              <label className="input input-bordered flex items-center gap-2">
                Start Date
                <input
                  type="datetime-local"
                  className="form-control"
                  value={dateStart}
                  onChange={(e) => setDateStart(e.target.value)}
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                End Date
                <input
                  type="datetime-local"
                  className="form-control"
                  value={dateEnd}
                  onChange={(e) => setDateEnd(e.target.value)}
                />
              </label>
              <label className="flex items-center gap-2">
                Initials: {initials}
              </label>
            </div>
          </div>
          <div className="mb-3 d-flex space-y-4 space-x-2">
            <IngestLogModal
              setProjectLocation={setProjectLocation}
              setStartDate={setDateStart}
              setEndDate={setDateEnd}
            />
            <button
              className="btn"
              onClick={() => {
                handleSubmit();
                const modalElement = document.getElementById(
                  "create_projet_modal"
                ) as HTMLDialogElement | null;
                if (modalElement) {
                  modalElement.close();
                }
              }}>
              Create Project
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default CreateProjectModal;
