"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ProjectContextInterface } from './ProjectContextInterface';
import { Project } from '../components/projectComponents/project-interface';

// Create the context with an initial undefined value but assert the type.
const ProjectContext = createContext<ProjectContextInterface | undefined>(undefined);

// Create a provider component
export const ProjectProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [project, setProject] = useState<Project | null>(null);

  const value = { project, setProject };

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};

// Custom hook to use the project context
export const useProject = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};