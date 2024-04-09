'use client'
import React, { useEffect, useState } from "react";
import { Book, Pencil, XOctagon, Images,FlagFill } from "react-bootstrap-icons";
import { Image, Button } from "react-bootstrap";
import TOAIconLibrary from "../toaIconLibrary/page"; // Import the RenderIconLibrary component
import CSS from 'csstype';

const thStyles: CSS.Properties = {
  backgroundColor: '#3f3f3f', 
  color: 'white',
  borderBottom:'2px solid #000', 
  borderColor:"#000",
  textAlign:"center"
};

const tdStyle:CSS.Properties={
  border:"2px solid #ccc",
  textAlign:"left",  
}

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
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showIconLibrary, setShowIconLibrary] = useState(false);

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

  const handleIconsLibraryClick = () => {
    setShowIconLibrary(true);
  };

  return (
    <div style={{ overflowX: "hidden" }}>
      <NavBar />
      <div className="position-relative" style={{ top: "calc(0px + 1rem)" }}>
        <div className="container-fluid">
          <div className="row justify-content-center align-items-center">
            <div className="col-12">
              <div className="d-flex justify-content-between align-items-center p-2">
                {showIconLibrary ? (
                  <>
                    <Images size={50} />
                    <h2 className="flex-grow-1 m-0" style={{ whiteSpace: "nowrap", padding: 10 }}>
                      Icon Library
                    </h2 >
                  </>
                ) : (
                  <>
                    <Book size={50} />
                    <h2 className="flex-grow-1 m-0" style={{ whiteSpace: "nowrap", padding: 10 }}>
                      Project Events
                    </h2>
                  </>
                )}
                <Button variant="primary" onClick={handleIconsLibraryClick} >
                  TOA Icon Library<Images size={30} style={{ padding: 5 }} />
                </Button>
              </div>
              <div style={{ overflowX: "auto", maxWidth: "125%" }}>
                {showIconLibrary ? (
                  <TOAIconLibrary />
                ) : (
                  <table className="table table-striped table-bordered">
                    <thead  >
                      <tr>
                        <th style={thStyles}>Malformed</th>
                        <th style={thStyles}>Timestamp</th>
                        <th style={thStyles}>Initials</th>
                        <th style={thStyles}>Team</th>
                        <th style={thStyles}>Posture</th>
                        <th style={thStyles}>Description</th>
                        <th style={thStyles}>Location</th>
                        <th style={thStyles}>Source Host</th>
                        <th style={thStyles}>Target Host List</th>
                        
                        <th style={thStyles}>Data Source</th>
                        <th style={thStyles}>Icon</th>
                        <th style={thStyles}>Action Title</th>
                        <th style={thStyles}>Vector ID</th>     
                        <th style={thStyles}>Last Modified</th>
                        <th style={thStyles}></th>
                      </tr>
                    </thead>
                    <tbody > 
                      {events.map((event, index) => (
                        <tr key={index}>
                          <td style={tdStyle}>
                            {event.is_malformed ? <FlagFill size={35} style={{color:"blue"}}/> : ""}</td>
                          <td style={tdStyle}>{event.timestamp ? new Date(event.timestamp).toLocaleString() : "N/A"}</td>
                          <td style={tdStyle}>{event.initials}</td>
                          <td style={tdStyle}>{event.team}</td>
                          <td style={tdStyle}>{event.posture}</td>
                          <td style={tdStyle}>{event.description}</td>
                          <td style={tdStyle}>{event.location}</td>
                          <td style={tdStyle}>{event.source_host}</td>
                          <td style={tdStyle}>{event.target_host_list?.join(", ")}</td>
                          <td style={tdStyle}>{event.data_source}</td>
                          <td>
                            <Image
                              className="p-0"
                              src={event.icon}
                              width={"auto"}
                              height={"auto"}
                              alt={event.action_title}
                            ></Image>{" "}
                          </td>
                          <td style={tdStyle}>{event.action_title}</td>
                          <td style={tdStyle}>{event.vector_id}</td>
                          <td style={tdStyle}>{new Date(event.last_modified).toLocaleString()}</td>
                          <td>
                            <Button variant="primary" onClick={() => handleEditClick(index)} size="sm">
                            <span style={{ display: 'flex', alignItems: 'right' }}> 
                              <Pencil size={25}/> Edit Event
                            </span> 
                            </Button>
                            <Button variant="danger" onClick={() => handleDeleteClick(event)} size="sm">
                              <span style={{ display: 'flex', alignItems: 'center' }}>
                                <XOctagon size={25}/> Delete Event
                              </span>
                            </Button>
                            
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
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
          <button onClick={handleConfirmDelete} style={{ marginRight: "10px", backgroundColor: "red", color: "white" }}>
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
      <Footer />
    </div>
  );
};

export default EventsList;