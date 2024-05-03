"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { ProjectContextInterface } from "./ProjectContextInterface";
import { Project } from "../components/projectComponents/project-interface";
import { Event } from "../components/eventComponents/event-interface";

const defaultEvent: Event = {
  id: "default-id",
  action_title: "Default Action",
  data_source: "Default Source",
  description: "This is a default event description.",
  icon: "default_icon.png",
  initials: "DE",
  is_malformed: false,
  last_modified: "2024-01-01T00:00:00Z",
  location: "Default Location",
  posture: "Unknown",
  source_host: "default_source_host",
  target_host_list: [],
  team: "Default Team",
  timestamp: "2024-01-01T00:00:00Z",
  vector_id: "default-vector-id",
};

const defaultProject: Project = {
  id: "N/A",
  name: "No Project Selected",
  start_date: "N/A",
  end_date: "N/A",
  location: "N/A",
  initials: "N/A",
  events: [defaultEvent],
};

const ProjectContext = createContext<ProjectContextInterface | undefined>(
  undefined
);

const localStorageKey = "currentProject";

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [project, setProject] = useState<Project>(defaultProject);

  useEffect(() => {
    // Ensuring this runs only on the client side
    if (typeof window !== 'undefined') {
      const storedProject = localStorage.getItem(localStorageKey);
      console.log("Stored Project: ", storedProject)
      if (storedProject && storedProject != 'undefined') {
        setProject(JSON.parse(storedProject));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Save the project to localStorage whenever it changes
      localStorage.setItem(localStorageKey, JSON.stringify(project));
    }
  }, [project]);

  const updateEvent = (eventId: string, updatedEventData: Event) => {
    setProject((currentProject) => {
      const updatedEvents = currentProject.events.map((event) =>
        event.id === eventId ? { ...event, ...updatedEventData } : event
      );
      return { ...currentProject, events: updatedEvents };
    });
  };

  const addEvent = (newEvent: Event) => {
    setProject((currentProject) => ({
      ...currentProject,
      events: [...currentProject.events, newEvent],
    }));
  };

  const deleteEvent = (eventId: string) => {
    setProject((currentProject) => ({
      ...currentProject,
      events: currentProject.events.filter(event => event.id !== eventId),
    }));
  };

  const fetchProject = async (projectName: string) => {
    try {
      const response = await fetch(`http://localhost:8000/api/getproject/${projectName}`);
      const fetchedProject = await response.json();
      if (!response.ok) {
        throw new Error(fetchedProject.message || 'Failed to fetch the project');
      }
      setProject(fetchedProject);
    } catch (error) {
      console.error("Fetch project error:", error);
    }
  };

  const value = { project, setProject, updateEvent, addEvent, deleteEvent, fetchProject };

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};


export const useProject = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
};
