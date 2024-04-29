"use client";
import React, {
  createContext,
  useContext,
  ReactNode,
  useCallback,
} from "react";

type UndoRedoContextType = {
  undo: (projectId: string) => Promise<void>;
  redo: (projectId: string) => Promise<void>;
};

const UndoRedoContext = createContext<UndoRedoContextType | undefined>(
  undefined
);

export const UndoRedoProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const undo = useCallback(async (projectId: string) => {
    console.log(projectId);
    try {
      const response = await fetch(
        `http://localhost:8000/api/undo/${projectId}`,
        { method: "POST" }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "No action to undo");
      }
      alert("Undo successful!");
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  }, []);

  const redo = useCallback(async (projectId: string) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/redo/${projectId}`,
        { method: "POST" }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "No action to redo");
      }
      alert("Redo successful!");
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  }, []);

  return (
    <UndoRedoContext.Provider value={{ undo, redo }}>
      {children}
    </UndoRedoContext.Provider>
  );
};

export const useUndoRedo = () => {
  const context = useContext(UndoRedoContext);
  if (context === undefined) {
    throw new Error("useUndoRedo must be used within an UndoRedoProvider");
  }
  return context;
};
