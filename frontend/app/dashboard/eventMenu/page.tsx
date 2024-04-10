"use client";
import React, { useEffect, useState } from "react";
import { useProject } from "@/app/contexts/ProjectContext";
import EventMenu from "@/app/components/eventComponents/EventMenu";
import CreateEventModal from "@/app/components/eventComponents/event-create-modal";
import Sidebar from "@/app/ui/sidebar";

interface Event {
  id: string;
  initials: string;
  team: string;
  vector_id: string;
  location?: string;
  icon: string;
  action_title: string;
  description: string;
  source_host?: string;
  target_host_list?: string[];
  data_source: string;
  posture?: string;
  timestamp?: Date;
  is_malformed?: boolean;
  last_modified: Date;
}

const EventsList = () => {
  const { project } = useProject();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showIconLibrary, setShowIconLibrary] = useState(false);

  const handleCreateModal = () => {
    //when the create button is pressed and the modal is opened the event is set as the selected project
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-auto flex-col mx-0 rounded-3xl p-2">
      <div className=" flex flex-row items-center justify-between w-full rounded-3xl pr-5">
        <h1 className="text-3xl font-semibold pl-5">{project.name}</h1>
        <div className="flex mx-auto justify-end pl-24">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.0"
            stroke="currentColor"
            className="w-9 h-9 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
            />
          </svg>

          <h1 className="text-3xl font-semibold px-2">Manage Events:</h1>
        </div>
        <CreateEventModal />
      </div>
      <div className="px-5 py-1 rounded-3xl">
        <EventMenu />
      </div>
    </div>
  );
};

export default EventsList;
