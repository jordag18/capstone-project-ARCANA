"use client";
import React, { useEffect, useState } from "react";
import { useProject } from "@/app/contexts/ProjectContext";
import EventMenu from "@/app/components/eventComponents/EventMenu";
import CreateEventModal from "@/app/components/eventComponents/event-create-modal";
import { TableCellsIcon } from "@heroicons/react/20/solid";

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

  const handleCreateModal = () => {
    //when the create button is pressed and the modal is opened the event is set as the selected project
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-auto flex-col mx-0 rounded-3xl p-2 ">
      <div className=" flex flex-row items-center justify-between w-full rounded-3xl pr-5">
        <h1 className="text-3xl font-semibold pl-5">{project.name}</h1>
        <div className="flex mx-auto justify-end pl-24">
          <TableCellsIcon className="h-10 w-10" />
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
