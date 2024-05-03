"use client";
import React, { useEffect, useState } from "react";
import { useProject } from "@/app/contexts/ProjectContext";
import EventMenu from "@/app/components/eventComponents/EventMenu";
import CreateEventModal from "@/app/components/eventComponents/event-create-modal";
import FilterEventsDialog from "@/app/components/eventComponents/FilterEventsDialog";
import { CreateEvent } from "@/app/components/eventComponents/event-interface";
import { useUndoRedo } from "@/app/contexts/EventHistoryContext";

const EventsList = () => {
  const { project, fetchProject } = useProject();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState({});
  const [sortCriterion, setSortCriterion] = useState("");
  const [newEvent, setNewEvent] = useState<CreateEvent | null>(null);
  const { undo, redo } = useUndoRedo();
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const undoEvents = () => {
    undo(project.id);
    fetchProject(project.name);
  };

  const redoEvents = () => {
    redo(project.id);
    fetchProject(project.name);
  };

  const handleCreateModal = () => {
    setIsModalOpen(true);
  };

  const handleOpenFilterDialog = () => {
    setIsFilterDialogOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateEventSubmit = (eventData: CreateEvent) => {
    console.log("Event Created:", eventData);
    // Implement your logic to process eventData, such as an API call or updating local state
    // For example, refreshing event list or closing modal could be handled here
    setIsModalOpen(false); // Assuming you want to close the modal on successful submit
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
              className="btn bg-blue-500 text-white shadow-md hover:bg-blue-600"
              onClick={() => fetchProject(project.name)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                fill="currentColor"
                className="bi bi-arrow-repeat"
                viewBox="0 0 16 16"
              >
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
              className="btn bg-gray-300 shadow-md hover:bg-gray-200 ml-2"
              onClick={undoEvents}
            >
              Undo
            </button>
            <button
              className="btn bg-gray-300 shadow-md hover:bg-gray-200 ml-2"
              onClick={redoEvents}
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
            onSubmit={handleCreateEventSubmit} // Pass the handler here
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
          key={refreshTrigger ? "refresh" : "no-refresh"}
        />
      </div>
    </div>
  );
};

export default EventsList;
