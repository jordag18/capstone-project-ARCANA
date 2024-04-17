"use client";
import React, { useEffect, useState } from "react";
import { useProject } from "@/app/contexts/ProjectContext";
import EventMenu from "@/app/components/eventComponents/EventMenu";
import CreateEventModal from "@/app/components/eventComponents/event-create-modal";
import FilterEventsDialog from "@/app/components/eventComponents/FilterEventsDialog";
import { CreateEvent } from "@/app/components/eventComponents/event-interface";
import { useUndoRedo } from "@/app/contexts/EventHistoryContext";


const EventsList = () => {
  const { project } = useProject();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState({});
  const [sortCriterion, setSortCriterion] = useState("");
  const [newEvent, setNewEvent] = useState<CreateEvent | null>(null);
  const { undo, redo } = useUndoRedo();

  const handleCreateModal = (createEvent: CreateEvent) => {
    setNewEvent(createEvent);
    setIsModalOpen(true);
  };

  const handleOpenFilterDialog = () => {
    setIsFilterDialogOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const updateFilterCriteria = (criteria) => {
    setFilterCriteria(criteria); // Update current criteria
  };

  const handleSortChange = (event) => {
    setSortCriterion(event.target.value);
  };

  return (
    <div className="flex flex-auto flex-col mx-0 rounded-3xl p-2 ">
      <div className="flex flex-row items-center justify-between w-full rounded-3xl pr-5">
        <h1 className="text-3xl font-semibold pl-5">{project.name}</h1>
        <div className="flex items-center">
          <div className="px-5 py-1 space-x-1 rounded-3xl">
            <button
              className="btn bg-gray-300 shadow-md hover:bg-gray-200 ml-2"
              onClick={() => undo(project.id)}
            >
              Undo
            </button>
            <button
              className="btn bg-gray-300 shadow-md hover:bg-gray-200 ml-2"
              onClick={() => redo(project.id)}
            >
              Redo
            </button>
          </div>
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
          <select
            className="btn bg-gray-300 shadow-md hover:bg-gray-200 ml-2"
            value={sortCriterion}
            onChange={handleSortChange}
          >
            <option value="" disabled>
              Sort By
            </option>
            <option value="">None</option>
            <option value="timestamp">Timestamp</option>
            <option value="initials">Initials</option>
            <option value="team">Team</option>
            <option value="location">Location</option>
            <option value="sourceHost">Source Host</option>
            <option value="targetHost">Target Host</option>
            <option value="vectorId">Vector ID</option>
          </select>
        </div>
        <FilterEventsDialog
          isOpen={isFilterDialogOpen}
          onClose={() => setIsFilterDialogOpen(false)}
          onUpdateCriteria={updateFilterCriteria} // Step 2
        />
      </div>
      <div className="px-5 py-1 rounded-3xl">
        <EventMenu
          criteria={filterCriteria}
          sortCriterion={sortCriterion}
        />
      </div>
    </div>
  );
};

export default EventsList;
