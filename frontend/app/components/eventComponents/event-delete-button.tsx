import React from "react";
import { useProject } from "@/app/contexts/ProjectContext";
import { Event } from "./event-interface";

interface selectedEventProp {
  selectedEvent: Event;
  onClose: () => void;
}

const DeleteEventButton: React.FC<selectedEventProp> = ({
  selectedEvent,
  onClose,
}) => {
  const { project, setProject } = useProject();

  const handleConfirmDelete = async () => {
    if (selectedEvent && project) {
      try {
        const response = await fetch(
          `http://localhost:8000/api/deleteEvent/${project.name}/${selectedEvent.id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete the event");
        }

        alert(`Successfully deleted event with ID: ${selectedEvent.id}`);

        const updatedEvents = project.events.filter(
          (event) => event.id !== selectedEvent.id
        );
        // Update the project with the new events array
        setProject({ ...project, events: updatedEvents });
        onClose();
      } catch (error) {
        console.error("Error deleting event:", error);
        alert("Error deleting event");
      }
    }
  };
  return (
    <button className="btn bg-red-500 text-white" onClick={handleConfirmDelete}>
      Delete
    </button>
  );
};

export default DeleteEventButton;
