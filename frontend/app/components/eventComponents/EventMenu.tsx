"use client";
import React, { useState, useEffect } from "react";
import { useProject } from "@/app/contexts/ProjectContext";
import EditEventModal from "./event-modify-modal";
import { Event } from "./event-interface";

const EventMenu = ({ criteria, sortCriterion }) => {
  const { project } = useProject();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [filteredEvents, setFilteredEvents] = useState([]);

  const handleOpenModal = (event: Event) => {
    //when an event's modify button is pressed and the modal is opened the event is set as the selected project
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  useEffect(() => {
    const filtered = project.events.filter((event) => {
      // For date comparisons, create Date objects from parts to ensure accuracy
      const eventDateAndTime = new Date(event.timestamp);
      const startDateCriteria = new Date(criteria.startDate);
      const endDateCriteria = new Date(criteria.endDate);

      // Start Date Filtering
      if (criteria.startDate) {
        if (eventDateAndTime < startDateCriteria) return false;
      }

      // End Date Filtering
      if (criteria.endDate) {
        if (eventDateAndTime > endDateCriteria) return false;
      }

      //if there is criteria for vector id check where it matches
      if (criteria.vectorId && event.vector_id !== criteria.vectorId)
        return false;

      //check where event ID matches inputted
      if (criteria.id && event.id !== criteria.id) return false;

      if (criteria.location && event.location !== criteria.location)
        return false;

      if (criteria.initials && event.initials !== criteria.initials)
        return false;

      if (criteria.team && event.team !== criteria.team) return false;

      return true; // Event matches all specified criteria
    });

    if (sortCriterion) {
      filtered.sort((a, b) => {
        if (sortCriterion === "timestamp") {
          return (
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
          );
        } else if (sortCriterion === "initials") {
          return a.initials.localeCompare(b.initials);
        } else if (sortCriterion === "team") {
          return a.team.localeCompare(b.team);
        } else if (sortCriterion === "location") {
          return a.location.localeCompare(b.location);
        } else if (sortCriterion === "sourceHost") {
          return a.source_host.localeCompare(b.source_host);
        } else if (sortCriterion === "targetHost") {
          return a.target_host_list.localeCompare(b.target_host_list);
        } else if (sortCriterion === "vectorId") {
          return a.vector_id.localeCompare(b.vector_id);
        }
        return 0;
      });
    }
    setFilteredEvents(filtered);
  }, [criteria, project.events, sortCriterion]); // Re-run this effect if criteria or project.events change

  return (
    <div className="flex overflow-auto rounded-lg">
      <table className="table w-full table-fixed">
        <thead className="bg-slate-300 border-b-2 border-slate-500">
          <tr>
            <th className="w-1/12 min-w-[120px]">Malformed</th>
            <th className="w-2/12 break-words min-w-[120px]">Timestamp</th>
            <th className="w-1/12 min-w-[120px]">Initials</th>
            <th className="w-1/12 min-w-[120px]">Team</th>
            <th className="w-1/12 min-w-[120px]">Posture</th>
            <th className="w-3/12 break-words min-w-[120px]">Description</th>
            <th className="w-1/12 min-w-[120px]">Location</th>
            <th className="w-1/12 min-w-[120px]">Source Host</th>
            <th className="w-1/12 break-words min-w-[120px]">Target Host List</th>
            <th className="w-1/12 min-w-[120px]">Vector ID</th>
            <th className="w-1/12 break-words min-w-[120px]">Data Source</th>
            <th className="w-1/12 break-words min-w-[120px]">Last Modified</th>
            <th className="w-1/12 min-w-[120px]"></th>
          </tr>
        </thead>
        <tbody className="bg-base-200">
          {filteredEvents.map((event: Event, index) => (
            <tr key={index} className="hover:bg-slate-200">
              <td>{event.is_malformed}</td>
              <td className="break-words">{event.timestamp}</td>
              <td>{event.initials}</td>
              <td>{event.team}</td>
              <td>{event.posture}</td>
              <td className="break-words">{event.description}</td>
              <td>{event.location}</td>
              <td>{event.source_host}</td>
              <td className="break-words">{event.target_host_list}</td>
              <td className="break-words">{event.vector_id}</td>
              <td className="break-words">{event.data_source}</td>
              <td className="break-words">{event.last_modified}</td>
              <td>
                <button
                  className="btn bg-gray-300 shadow-md hover:bg-gray-200 w-full sm:w-auto"
                  onClick={() => handleOpenModal(event)}
                >
                  Modify
                </button>
                {selectedEvent && (
                  <EditEventModal
                    selectedEvent={selectedEvent}
                    isModalOpen={isModalOpen}
                    onClose={handleCloseModal}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventMenu;
