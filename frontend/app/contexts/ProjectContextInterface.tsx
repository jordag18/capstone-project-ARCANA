import { Project } from "../components/projectComponents/project-interface";
import { Event } from "../components/eventComponents/event-interface";

export interface ProjectContextInterface {
  project: Project;
  setProject: (project: Project) => void;
  updateEvent: (eventId: string, updatedEventData: Event) => void;
  addEvent: (newEvent: Event) => void;
  deleteEvent: (eventId: string) => void; 
  fetchProject: (projectName: string) => Promise<void>;
}
