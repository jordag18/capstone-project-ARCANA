import React, { useState } from "react";
import { useProject } from "@/app/contexts/ProjectContext";
import { Event } from "./event-interface";

interface selectedEventProp {
  selectedEvent: Event;
}

const SaveEventButton: React.FC<selectedEventProp> = ({ selectedEvent }) => {
  const { project, setProject } = useProject();
  const [updatedEventData, setupdatedEventData] =
    useState<Event>(selectedEvent);

  const handleEditEvent = async () => {
    if (selectedEvent && project) {
      try {
        const response = await fetch(
          `http://localhost:8000/api/editEvent/${project.name}/${selectedEvent.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedEventData),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to edit the event");
        }

        alert(`Successfully edited event with ID: ${selectedEvent.id}`);

        const updatedEvent = await response.json();

        const updatedEvents = project.events.map((event) =>
          event.id === selectedEvent.id ? updatedEvent : event
        );

        setProject({ ...project, events: updatedEvents });
      } catch (error) {
        console.error("Error editing event:", error);
        alert("Error editing event");
      }
    }
  };

  return (
    <button
      className="btn bg-gray-400 text-white hover:bg-gray-300"
      onClick={handleEditEvent}>
      Edit {/* Placeholder for future implementation */}
    </button>
  );
};

export default SaveEventButton;
