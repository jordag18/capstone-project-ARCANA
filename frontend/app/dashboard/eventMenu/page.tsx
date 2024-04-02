'use client';
import React, { useEffect, useState } from "react";
import NavBar from "../../components/navbar"; // Update the import statement to use lowercase 'navbar'
import Footer from "../../components/footer";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/esm/Row";
import { Folder2 } from "react-bootstrap-icons";
Date
interface Event {
    initials : string;
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


// Define a functional component to render a single event row
const EventRow: React.FC<{ event: Event }> = ({ event }) => {
  return (
      <tr>
          <td>{event.initials}</td>
          <td>{event.team}</td>
          <td>{event.vector_id}</td>
          <td>{event.location}</td>
          <td>{event.icon}</td>
          <td>{event.action_title}</td>
          <td>{event.description}</td>
          <td>{event.source_host}</td>
          <td>{event.target_host_list?.join(', ')}</td>
          <td>{event.data_source}</td>
          <td>{event.posture}</td>
          <td>{event.timestamp?.toString()}</td>
          <td>{event.is_malformed ? 'Yes' : 'No'}</td>
          <td>{event.last_modified.toString()}</td>
      </tr>
  );
};

const EventsList: React.FC<{ projectName: string}> = ({ projectName }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>('asa')

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/events?project_name=${projectName}`);
        if (!response.ok) {
          throw new Error('Network response was not ok: ' + response.statusText);
        }
        const eventsData: Event[] = await response.json();
        setEvents(eventsData);
      } catch (error) {
        console.error('Error fetching Events: ', error);
      }
    };
    fetchEvents();
  }, [selectedProject]);

  // Here you can handle dialog opening and other logic related to events

  return (
    <div>
      <NavBar />
      <div
        className="position-relative"
        style={{ top: "calc(0px + 1rem)" }}>
        {/* Adjust the top value according to your NavBar's height and padding */}
        <div className="container-fluid">
          <div className="row justify-content-center align-items-center">
            <div className="col-12">
              <div className="d-flex justify-content-between align-items-center p-2">
                <Folder2 size={80} />
                <h2 className="flex-grow-1 m-0" style={{ whiteSpace: 'nowrap' }}>Project Events</h2>
              </div>
            </div>
            <div className="col-12">
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Initials</th>
                    <th>Team</th>
                    <th>Vector ID</th>
                    <th>Location</th>
                    <th>Icon</th>
                    <th>Action Title</th>
                    <th>Description</th>
                    <th>Source Host</th>
                    <th>Target Host List</th>
                    <th>Data Source</th>
                    <th>Posture</th>
                    <th>Timestamp</th>
                    <th>Is Malformed</th>
                    <th>Last Modified</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event, index) => (
                    <tr key={index}>
                      <td>{event.initials}</td>
                      <td>{event.team}</td>
                      <td>{event.vector_id}</td>
                      <td>{event.location}</td>
                      <td>{event.icon}</td>
                      <td>{event.action_title}</td>
                      <td>{event.description}</td>
                      <td>{event.source_host}</td>
                      <td>{event.target_host_list?.join(', ')}</td>
                      <td>{event.data_source}</td>
                      <td>{event.posture}</td>
                      <td>{event.timestamp?.toString()}</td>
                      <td>{event.is_malformed ? 'Yes' : 'No'}</td>
                      <td>{event.last_modified.toString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EventsList;
