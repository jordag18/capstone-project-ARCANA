import { useState, useEffect } from 'react'
import { useProject } from '@/app/contexts/ProjectContext'
import { CreateEvent } from './event-interface'
import axios from 'axios'

interface createEventProp {
  newEvent: CreateEvent;
  isModalOpen: boolean;
  onClose: () => void;
  onSubmit: (eventData: CreateEvent) => void;  // Ensure this line is added

}

interface IconLibrary {
  [team: string]: {
      [iconName: string]: IconInfo;
  };
}

interface IconInfo {
  image: string;
  isDefault: boolean;
}

const CreateEventModal: React.FC<createEventProp> = ({
  newEvent,
  isModalOpen,
  onClose,
  onSubmit,
}) => {
  const { project } = useProject();
  const [formData, setFormData] = useState<
    CreateEvent & { autoCreateEdges: boolean }
  >({
    ...newEvent,
    autoCreateEdges: false,
  });

  const handleSubmit = async () => {
    if (
      !formData.initials ||
      formData.initials.trim() === "" ||
      formData.initials.length > 2 ||
      !formData.team ||
      formData.team.trim() === "" ||
      !formData.description ||
      formData.description.trim() === "" ||
      !formData.icon ||
      formData.icon.trim() === ""
    ) {
      return;
    }

    console.log("Create Event", formData, "body", JSON.stringify(formData));

    // Create a copy of formData to modify before sending
    const { autoCreateEdges, ...eventData } = formData;
    const bodyData = {
      event_create: eventData, // This should match the expected structure in the backend
      auto_create_edges: autoCreateEdges, // This will be extracted separately on the server
    };

    try {
      const response = await fetch(
        `http://localhost:8000/api/createEvent/${project.name}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(bodyData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create event");
      }
      onSubmit(formData);
      onClose();
    } catch (error) {
      console.error("Error creating event: ", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        icon: file.name,
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
    const modal = document.getElementById("create_event_modal");
    if (modal) {
      isModalOpen ? modal.showModal() : modal.close();
    }
  }, [isModalOpen]);

  return (
    <dialog
      id="create_event_modal"
      className="modal"
      style={{ width: "80%", height: "80%" }}
    >
      <div className="modal-box">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={onClose}
          >
            X
          </button>
        </form>
        <div className="flex flex-col space-y-2">
          <h3 className="font-bold text-lg">Create Event</h3>
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
                    value={formData?.action_title}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="flex-col">
                <h2>Initials</h2>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    name="initials"
                    className="grow"
                    placeholder="Initials"
                    value={formData?.initials}
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
                    value={formData?.team}
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
                    value={formData?.vector_id}
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
                    value={formData?.location}
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
                    value={formData?.source_host}
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
                    value={formData?.target_host_list}
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
                    value={formData?.data_source}
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
                    value={formData?.posture}
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
                    value={formData?.timestamp}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="flex-col">
                <h2>Description</h2>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    name="description"
                    className="grow"
                    placeholder="Description"
                    value={formData?.description}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="flex-col">
                <h2>Icon</h2>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="file"
                    name="icon"
                    accept="image/*"
                    className="grow"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>
          </div>
          <div>
            <label className="label cursor-pointer">
              <span className="label-text">Auto-create edges</span>
              <input
                type="checkbox"
                name="autoCreateEdges"
                checked={formData.autoCreateEdges}
                className="checkbox"
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <button className="btn" onClick={handleSubmit}>
              Create Event
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default CreateEventModal;
