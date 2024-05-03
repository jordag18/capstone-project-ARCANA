import { useState, useEffect } from "react";
import { useProject } from "@/app/contexts/ProjectContext";
import { CreateEvent } from "./event-interface";
import axios from "axios";

interface createEventProp {
  newEvent: CreateEvent;
  isModalOpen: boolean;
  onClose: () => void;
}

interface IconInfo {
  image: string;
  isDefault: boolean;
}

interface IconLibrary {
  [team: string]: {
    [iconName: string]: IconInfo;
  };
}

const CreateEventModal: React.FC<createEventProp> = ({
  newEvent,
  isModalOpen,
  onClose,
}) => {
  const { project, addEvent } = useProject();
  const [formData, setFormData] = useState<CreateEvent>(newEvent);
  const [iconLibraries, setIconLibraries] = useState<IconLibrary>({});
  const [autoEdge, setAutoEdge] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  // State to store fetched initials
  const [initials, setInitials] = useState('');

  // Function to fetch initials from the API
  const fetchInitials = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/getInitials');
      setInitials(response.data.initials); // Assuming the API returns an object with an 'initials' field
    } catch (error) {
      console.error('Failed to fetch initials:', error);
    }
  };

  // Fetch initials when the component mounts
  useEffect(() => {
    fetchInitials();
  }, []);

  useEffect(() => {
    if (initials) {
      setFormData(prevFormData => ({...prevFormData, initials}))
    }
  }, [initials])

  const fetchIconLibrary = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/project/${project.id}/icon-libraries`
      );
      setIconLibraries(response.data);
    } catch (error) {
      console.error("Failed to fetch icon libraries:", error);
    }
  };

  const handleSubmit = async () => {
    console.log(
      "formdata",
      JSON.stringify(formData),
      "autoedge",
      JSON.stringify({ auto_edges: { auto_edge: autoEdge } })
    );
  
    try {
      const response = await fetch(
        `http://localhost:8000/api/createEvent/${project.name}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            event_create: formData,
            auto_edges: { auto_edge: autoEdge },
          }),
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to create event:", errorData);
        alert(
          `Failed to create event: ${errorData.detail || response.statusText}`
        );
        return;
      }
  
      const createdEvent = await response.json();
      addEvent(createdEvent);
      console.log("Event created successfully:", createdEvent);
      onClose(); // Close the modal after successful creation
    } catch (error) {
      console.error("Error creating event: ", error);
      alert("Error creating event: " + error.message);
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
        [name]: name === "icon" ? value.replace(/^.*[\\\/]/, "") : value,
      }));
    }
  };

  const handleIconChange = (iconName, iconInfo, team) => {
    setFormData((prevFormData) => {
      const newFormData = {
        ...prevFormData,
        action_title: iconName,
        icon: iconInfo.image, // Ensure this is just 'RedTeam_Activity.png'
        team: team,
      };
      console.log("Icon selected:", iconInfo.image); // This will log what icon is being stored
      return newFormData;
    });
    setSelectedIcon(iconName);
  };

  useEffect(() => {
    const modal = document.getElementById(
      "create_event_modal"
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
    fetchIconLibrary();
  }, [project.id]);


  return (
    <dialog
      id="create_event_modal"
      className="modal"
      style={{ width: "100%", height: "100%", marginTop: "1rem" }}
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
              <div className="flex-col"></div>
              <div className="flex-col" style={{marginBottom: '1rem'}}>
                <label className="flex items-center gap-2">
                  Initials: {initials}
                </label>
              </div>
              <div className="flex-col"></div>
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
            </div>
          </div>
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
          <h2>Icon</h2>
          <div style={{ overflow: "auto", height: "10rem", border: "solid" }}>
            {Object.entries(iconLibraries).map(([team, icons]) => (
              <div key={team}>
                <h2 style={{ marginLeft: "1rem" }}>{team} Team TOA Icons</h2>
                <hr
                  style={{
                    height: "2px",
                    width: "100%",
                    color: "black",
                    backgroundColor: "black",
                  }}
                />
                <div style={{ display: "flex", alignItems: "center" }}>
                  {Object.entries(icons).map(([iconName, iconInfo]) => (
                    <div
                      className={`hover:bg-gray-200 ${
                        selectedIcon === iconName ? "bg-yellow-200" : ""
                      }`}
                      key={iconName}
                      style={{
                        marginLeft: "1rem",
                        marginRight: "2rem",
                        marginBottom: "1rem",
                      }}
                      onClick={() => handleIconChange(iconName, iconInfo, team)}
                    >
                      <img
                        src={`/Icons/${iconInfo.image}`}
                        alt={iconName}
                        style={{ width: "50px", height: "50px" }}
                      />
                      <p>{iconName}</p>
                      {iconInfo.isDefault && (
                        <p style={{ color: "gray", fontSize: "12px" }}>
                          {" "}
                          default
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="checkbox"
              checked={autoEdge}
              onChange={(e) => setAutoEdge(e.target.checked)}
            />
            Auto Edge
          </label>
          <div>
            <button
              className="btn bg-gray-300 shadow-md hover:bg-gray-200 ml-2"
              onClick={handleSubmit}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default CreateEventModal;
