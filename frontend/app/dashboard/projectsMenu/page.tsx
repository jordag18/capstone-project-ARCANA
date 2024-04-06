"use client";
import React from "react";
import ProjectMenu from "@/app/components/projectComponents/ProjectMenu";
import CreateProjectModal from "@/app/components/projectComponents/CreateProjectModal";

const ManageProjectsPage = () => {
  return (
    <div className="flex-1 container mx-0 md:px-1">
      <div className="flex-1 container mx-0 md:px-1 flex flex-col items-center pb-3">
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex mx-auto justify-end pl-24">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2.0"
              stroke="currentColor"
              className="w-9 h-9 mr-1"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
              />
            </svg>
            <h1 className="text-3xl font-semibold px-2">Manage Projects</h1>
          </div>
          <CreateProjectModal />
        </div>
      </div>
      <ProjectMenu />
    </div>
  );
};
export default ManageProjectsPage;
