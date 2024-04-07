"use client";
import React, { useState } from "react";
import { useProject } from "@/app/contexts/ProjectContext";
import EditEventModal from "./event-modify-modal";
import { Event } from "./event-interface";

const EventMenu = () => {
  const { project} = useProject();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleOpenModal = (event: Event) => { //when an event's modify button is pressed and the modal is opened the event is set as the selected project
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

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
          {project?.events.map((event, index) => (
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
              <button className="btn bg-gray-300 shadow-md hover:bg-gray-200" onClick={() => handleOpenModal(event)}>Modify</button>
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
