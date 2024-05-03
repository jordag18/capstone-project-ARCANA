"use client";
import React, { useState } from "react";
import ProjectMenu from "@/app/components/projectComponents/ProjectMenu";
import CreateProjectModal from "@/app/components/projectComponents/CreateProjectModal";

const ManageProjectsPage = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const refreshProjects = () => {
    setRefreshTrigger(!refreshTrigger);
  };

  const openCreateProjectModal = () => {
    const modalElement = document.getElementById(
      "create_projet_modal"
    ) as HTMLDialogElement | null;
    if (modalElement) {
      modalElement.showModal();
    } else {
      console.error("Modal element not found");
    }
  };

  return (
    <div className="flex-1 container mx-0 md:px-1">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.0"
            stroke="currentColor"
            className="w-9 h-9 mr-1">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
            />
          </svg>
          <h1 className="text-3xl font-semibold" style={{marginRight: '3rem'}}>Manage Projects</h1>
        </div>
        <div className="flex space-x-3 items-center">
          <button
            className="btn bg-blue-500 text-white shadow-md hover:bg-blue-600"
            onClick={refreshProjects}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-repeat"
              viewBox="0 0 16 16">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9"
              />

              <path
                fillRule="evenodd"
                d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"
              />
            </svg>
            Refresh
          </button>
          <button
            className="btn bg-gray-300 shadow-md hover:bg-gray-200"
            onClick={openCreateProjectModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Create Project
          </button>
        </div>
      </div>
      <CreateProjectModal onProjectCreated={refreshProjects} />
      <ProjectMenu
        refreshProjects={refreshProjects}
        key={refreshTrigger ? "refresh" : "no-refresh"}
      />
    </div>
  );
};

export default ManageProjectsPage;
