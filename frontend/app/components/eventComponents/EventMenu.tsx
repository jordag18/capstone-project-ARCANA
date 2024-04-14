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
      console.log("Vector ID ", event.vector_id);

      // Start Date Filtering
      if (criteria.startDate) {
        if (eventDateAndTime < startDateCriteria) return false;
      }

      // End Date Filtering
      if (criteria.endDate) {
        if (eventDateAndTime > endDateCriteria) return false;
      }

      //Need to add time check criteria

      if (criteria.vectorId && event.vector_id !== criteria.vectorId)
        return false;

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
    console.log(filtered);
    setFilteredEvents(filtered);
  }, [criteria, project.events, sortCriterion]); // Re-run this effect if criteria or project.events change

  return (
    <div className="flex overflow-auto rounded-lg">
      <table className="table w-full">
        {/* head */}
        <thead className="bg-base-200 border-b-2 border-slate-500">
          <tr>
            <th>ID</th>
            <th>Icon</th>
            <th>Action Title</th>
            <th>Initials</th>
            <th>Team</th>
            <th>Vector ID</th>
            <th>Location</th>
            <th>Description</th>
            <th>Source Host</th>
            <th>Target Host List</th>
            <th>Data Source</th>
            <th>Posture</th>
            <th>Timestamp</th>
            <th>Malformed</th>
            <th>Last Modified</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="bg-base-200">
          {filteredEvents.map((event, index) => (
            <tr key={index} className="hover:bg-slate-200 ">
              {/* Each <td> is a cell for the project's attribute */}
              <td>{event.id}</td>
              <td>{event.icon}</td>
              <td>{event.action_title}</td>
              <td>{event.initials}</td>
              <td>{event.team}</td>
              <td>{event.vector_id}</td>
              <td>{event.location}</td>
              <td>{event.description}</td>
              <td>{event.source_host}</td>
              <td>{event.target_host_list}</td>
              <td>{event.data_source}</td>
              <td>{event.posture}</td>
              <td>{event.timestamp}</td>
              <td>{event.is_malformed}</td>
              <td>{event.last_modified}</td>
              <td>
                <button
                  className="btn bg-gray-300 shadow-md hover:bg-gray-200"
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
