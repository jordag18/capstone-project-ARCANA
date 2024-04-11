"use client";
import React, { useEffect, useState } from "react";
import { useProject } from "@/app/contexts/ProjectContext";
import EventMenu from "@/app/components/eventComponents/EventMenu";
import CreateEventModal from "@/app/components/eventComponents/event-create-modal";
import Sidebar from "@/app/ui/sidebar";
import FilterEventsDialog from "@/app/components/eventComponents/FilterEventsDialog";
import { CreateEvent } from "@/app/components/eventComponents/event-interface";


const EventsList = () => {
  const { project } = useProject();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showIconLibrary, setShowIconLibrary] = useState(false);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState({});
  const [newEvent, setNewEvent] = useState<CreateEventEvent | null>(null);


  const handleCreateModal = (createEvent: CreateEvent) => {
    setNewEvent(createEvent)
    setIsModalOpen(true)
  };

  const handleOpenFilterDialog = () => {
    setIsFilterDialogOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const updateFilterCriteria = (criteria) => {
  setFilterCriteria(criteria); // Update current criteria
  console.log(criteria)

};



  return (
    <div className="flex flex-auto flex-col mx-0 rounded-3xl p-2">
      <div className="flex flex-row items-center justify-between w-full rounded-3xl pr-5">
        <h1 className="text-3xl font-semibold pl-5">{project.name}</h1>
        <div className="flex items-center">
          <div
            className="btn bg-gray-300 shadow-md hover:bg-gray-200 ml-2"
            onClick={handleCreateModal}
          >
            + Create Event
          </div>
          <CreateEventModal 
            newEvent={newEvent}
            isModalOpen={isModalOpen}
            onClose={handleCloseModal}
          />
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
        <EventMenu criteria={filterCriteria} />
      </div>
    </div>
  );
};

export default EventsList;
