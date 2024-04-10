"use client";
import React, { useEffect, useState } from "react";
import { useProject } from "@/app/contexts/ProjectContext";
import EventMenu from "@/app/components/eventComponents/EventMenu";
import CreateEventModal from "@/app/components/eventComponents/event-create-modal";
import Sidebar from "@/app/ui/sidebar";
import FilterEventsDialog from "@/app/components/eventComponents/FilterEventsDialog";

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
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState({});

  const handleCreateModal = () => {
    //when the create button is pressed and the modal is opened the event is set as the selected project
    setIsModalOpen(true);
  };

  const handleOpenFilterDialog = () => {
    setIsFilterDialogOpen(true);
  };

  // Pass this function to FilterEventsDialog to update filter criteria
  const updateFilterCriteria = (criteria) => {
    setFilterCriteria(criteria);
  };

  return (
    <div className="flex flex-auto flex-col mx-0 rounded-3xl p-2">
      <div className="flex flex-row items-center justify-between w-full rounded-3xl pr-5">
        <h1 className="text-3xl font-semibold pl-5">{project.name}</h1>
        <div className="flex items-center">
          <CreateEventModal />
          <div
            className="btn bg-gray-300 shadow-md hover:bg-gray-200 ml-2" // Added some left margin for spacing
            onClick={handleOpenFilterDialog}
          >
            Filter Events
          </div>
        </div>
        <FilterEventsDialog
          isOpen={isFilterDialogOpen}
          onClose={() => setIsFilterDialogOpen(false)}
          onUpdateCriteria={updateFilterCriteria} // Step 2
        />
      </div>
      <div className="px-5 py-1 rounded-3xl">
        <EventMenu filterCriteria={filterCriteria} />
      </div>
    </div>
  );
};

export default EventsList;
