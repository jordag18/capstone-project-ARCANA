'use client';
import React, { useEffect, useState } from "react";

interface Event {
  //Event info goes here
}

const EventsList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  //dialog opening and stuff goes here

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/projects');
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
  }, []);


}


const ManageEventsPage = () => {
    return (
      <div>
        <ul>
          {EventsList.map((event, index) => (
            <li key={index}>
              <div style={{ flex: 1}}>
                {/** Event info here **/}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
}
export default ManageEventsPage;

