"use client";
import React, { useEffect, useState } from "react";
import { Book, Pencil, XOctagon } from "react-bootstrap-icons";
import { Image, Button } from "react-bootstrap";
import { useProject } from "@/app/contexts/ProjectContext";

interface Event {
  id: string;
  initials: string;
  team: string;
  vector_id: string;
  location?: string;
  icon: string;
  action_title: string;
  description: string;
  source_host?: string;
  target_host_list?: string[];
  data_source: string;
  posture?: string;
  timestamp?: Date;
  is_malformed?: boolean;
  last_modified: Date;
}

const EventsList: React.FC<{ projectName: string }> = ({ projectName }) => {
  const { project } = useProject();
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  //projectName = project.name;
  projectName = "Project2";

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/events?project_name=${projectName}`
        );
        if (!response.ok) {
          throw new Error(
            "Network response was not ok: " + response.statusText
          );
        }
        const eventsData: Event[] = await response.json();
        console.log("Fetched events:", eventsData); // Log fetched events
        setEvents(eventsData);
        eventsData.forEach((event) => {
          console.log(event);
        });
      } catch (error) {
        console.error("Error fetching Events: ", error);
      }
    };
    fetchEvents();
  }, [projectName]);

  const handleDeleteClick = (event: Event) => {
    setSelectedEvent(event);
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedEvent) {
      try {
        const response = await fetch(
          `http://localhost:8000/api/deleteEvent/${projectName}/${selectedEvent.id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete the event");
        }

        setEvents(events.filter((event) => event.id !== selectedEvent.id));
        alert(`Successfully deleted event with ID: ${selectedEvent.id}`);
      } catch (error) {
        console.error("Error deleting event:", error);
        alert("Error deleting event");
      }
    }
    setIsDialogOpen(false);
    setSelectedEvent(null);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedEvent(null);
  };

  const handleEditClick = (index: number) => {
    console.log("Edit button clicked for event index:", index);
  };

  return (
    <div style={{ overflowX: "hidden" }}>
      <div className="position-relative" style={{ top: "calc(0px + 1rem)" }}>
        <div className="container-fluid">
          <div className="row justify-content-center align-items-center">
            <div className="col-12">
              <div className="d-flex justify-content-between align-items-center p-2">
                <Book size={50} />
                <h2
                  className="flex-grow-1 m-0"
                  style={{ whiteSpace: "nowrap", padding: 10 }}
                >
                  Project Events
                </h2>
              </div>
              <div style={{ overflowX: "auto", maxWidth: "100%" }}>
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>ID</th> {/* Add ID column */}
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
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((event, index) => (
                      <tr key={index}>
                        <td>{event.id}</td> {/* Display ID */}
                        <td>
                          <Image
                            className="p-0"
                            src={event.icon}
                            width={"auto"}
                            height={"auto"}
                            alt={event.action_title}
                          ></Image>{" "}
                        </td>
                        <td>{event.action_title}</td>
                        <td>{event.initials}</td>
                        <td>{event.team}</td>
                        <td>{event.vector_id}</td>
                        <td>{event.location}</td>
                        <td>{event.description}</td>
                        <td>{event.source_host}</td>
                        <td>{event.target_host_list?.join(", ")}</td>
                        <td>{event.data_source}</td>
                        <td>{event.posture}</td>
                        <td>
                          {event.timestamp
                            ? new Date(event.timestamp).toLocaleString()
                            : "N/A"}
                        </td>
                        <td>{event.is_malformed ? "Yes" : "No"}</td>
                        <td>
                          {new Date(event.last_modified).toLocaleString()}
                        </td>
                        <td>
                          <Button
                            variant="primary"
                            onClick={() => handleEditClick(index)}
                            className="mr-2"
                          >
                            <Pencil />
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => handleDeleteClick(event)}
                          >
                            <XOctagon />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ paddingBottom: "75px" }}></div>
      {isDialogOpen && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            zIndex: 1000,
          }}
        >
          <p>Are you sure you want to delete this event?</p>
          <button
            onClick={handleConfirmDelete}
            style={{
              marginRight: "10px",
              backgroundColor: "red",
              color: "white",
            }}
          >
            Yes, Delete
          </button>
          <button onClick={handleCloseDialog}>Cancel</button>
        </div>
      )}
      {isDialogOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
          onClick={handleCloseDialog}
        ></div>
      )}
    </div>
  );
};

export default EventsList;
