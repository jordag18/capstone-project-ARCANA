import { Project } from "../components/projectComponents/project-interface";

export interface ProjectContextInterface {
  project: Project;
  setProject: (project: Project) => void;
}
