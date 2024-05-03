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
  const { project, setProject, deleteEvent } = useProject();

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

        deleteEvent(selectedEvent.id);
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
