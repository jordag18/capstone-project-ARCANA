"use client";
import React, { useEffect, useState } from "react";
import { useProject } from "@/app/contexts/ProjectContext";
import EventMenu from "@/app/components/eventComponents/EventMenu";
import Sidebar from "@/app/components/sidebar";

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

const EventsList = () => {
  const { project } = useProject();
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showIconLibrary, setShowIconLibrary] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/events?project_name=${project?.name}`
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
  }, [project?.name]);

  return (
    <div className="flex flex-auto"><Sidebar/>
    <div className="flex flex-auto flex-col mx-0 rounded-3xl p-2">
      <div className=" flex flex-row items-center justify-between w-full rounded-3xl pr-5">
        <h1 className="text-3xl font-semibold pl-5">{project.name}</h1>
        <div className="flex mx-auto justify-end pl-24">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2.0"
            stroke="currentColor"
            className="w-9 h-9 mr-1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
            />
          </svg>
          
          <h1 className="text-3xl font-semibold px-2">Manage Events:</h1>
            
        </div>
        <div className="btn bg-gray-300 shadow-md hover:bg-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Create Event
        </div>
      </div>
      <div className="border-indigo-500 px-5 py-1 rounded-3xl">
        <EventMenu />
      </div>
    </div>
    </div>
  );
};

export default EventsList;