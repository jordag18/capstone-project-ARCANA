"use client";
import React, { useState } from "react";
import IngestLogModal from "../IngestLogModal";

const CreateProjectModal = () => {
  const [projectName, setProjectName] = useState("");
  const [projectLocation, setProjectLocation] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [initials, setInitials] = useState("");

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
      // Close the modal and clear the form
      // Optionally, refresh the list of projects or add the new project to the state
    } catch (error) {
      console.error("Error creating project:", error);
      alert(`Error creating project: ${error.message}`);
    }

    // revalidatePath("/dashboard/projectsMenu");
  };

  return (
    <>
      <div
        className="btn bg-gray-300 shadow-md hover:bg-gray-200"
        onClick={() =>
          document.getElementById("create_projet_modal").showModal()
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        Create Project
      </div>
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
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  placeholder="Initials"
                  value={initials}
                  onChange={(e) => setInitials(e.target.value)}
                />
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
                document.getElementById("create_projet_modal").close();
              }}
            >
              Create Project
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default CreateProjectModal;
