"use client";
import React, { useState, useEffect } from "react";
import { useProject } from "@/app/contexts/ProjectContext";
import { Event } from "./event-interface";
import DeleteEventButton from "./event-delete-button";

interface selectedEventProp {
  selectedEvent: Event;
  isModalOpen: boolean;
  onClose: () => void;
}

const EditEventModal: React.FC<selectedEventProp> = ({
  selectedEvent,
  isModalOpen,
  onClose,
}) => {
  const { project, updateEvent } = useProject();
  const [formData, setFormData] = useState<Event>({
    ...selectedEvent,
    target_host_list:
      selectedEvent.target_host_list?.length ?? 0
        ? selectedEvent.target_host_list
        : [],
  });

  const handleSaveEvent = async () => {
    console.log("Save Event", formData, "body", JSON.stringify(formData));
    try {
      const response = await fetch(
        `http://localhost:8000/api/editEvent/${project.name}/${formData.id}`,
        {
          //response to update event in project in database
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData), //fills body of json response with updated event information
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update the event.");
      }

      const updatedEvent = await response.json();

      updateEvent(formData.id, formData); //uses the updateEvent function from project context to update modified event in context level

      onClose();
    } catch (error) {
      console.error("Error saving the event:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "target_host_list") {
      // Convert comma-separated string to a list of strings
      const targetHostList = value.split(",").map((item) => item.trim());
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: targetHostList,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    const modal = document.getElementById(
      "edit_event_modal"
    ) as HTMLDialogElement | null;
    if (modal) {
      if (isModalOpen) {
        modal.showModal();
      } else {
        modal.close();
      }
    }
  }, [isModalOpen]);

  useEffect(() => {
    setFormData({
      ...selectedEvent,
      target_host_list: Array.isArray(selectedEvent.target_host_list)
        ? selectedEvent.target_host_list
        : [],
    });
  }, [selectedEvent]);

  useEffect(() => {
    console.log("Opening modal with event data:", selectedEvent);
  }, [selectedEvent]);

  return (
    <dialog id="edit_event_modal" className="modal">
      <div className="modal-box w-full sm:w-3/4 lg:w-1/2 xl:w-1/3 2xl:max-w-5xl h-auto">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={onClose}>
            ✕
          </button>
        </form>
        <div className="flex flex-col space-y-2">
          <h3 className="font-bold text-lg">Event ID:{selectedEvent.id}</h3>
          <div className="flex flex-row space-x-2">
            <div className="flex-1 flex-col">
              <div className="flex-col">
                <h2>Action Title</h2>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    name="action_title"
                    className="grow"
                    placeholder="Action Title"
                    value={formData.action_title}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="flex-col">
                <h2>Team</h2>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    name="team"
                    className="grow"
                    value={formData.team}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="flex-col">
                <h2>Vector ID</h2>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    name="vector_id"
                    className="grow"
                    placeholder="Vector ID"
                    value={formData.vector_id}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="flex-col">
                <h2>Location</h2>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    name="location"
                    className="grow"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
            <div className="flex-1 flex-col">
              <div className="flex-col">
                <h2>Source Host</h2>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    name="source_host"
                    className="grow"
                    value={formData.source_host}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="flex-col">
                <h2>Target Host</h2>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    name="target_host_list"
                    className="grow"
                    value={formData.target_host_list}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="flex-col">
                <h2>Data Source</h2>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    name="data_source"
                    className="grow"
                    placeholder="Data Source"
                    value={formData.data_source}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="flex-col">
                <h2>Posture</h2>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    name="posture"
                    className="grow"
                    value={formData.posture}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="flex-col">
                <h2>Timestamp</h2>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="datetime-local"
                    name="timestamp"
                    className="grow"
                    value={formData.timestamp}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="flex-col">
            <h2>Description</h2>
            <textarea
              className="textarea textarea-bordered text-area-md w-full -max-w-xs"
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }></textarea>
          </div>
          <div className="flex flex-row justify-between w-full p-4">
            <button className="btn" onClick={handleSaveEvent}>
              Save Event
            </button>
            <DeleteEventButton
              selectedEvent={selectedEvent}
              onClose={onClose}
            />
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default EditEventModal;
