import { Project } from "../components/projectComponents/project-interface";

export interface ProjectContextInterface {
  project: Project | null;
  setProject: (project: Project) => void;
}
