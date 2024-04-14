"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Event } from '@/app/components/eventComponents/event-interface';

// Define the type for the state history
interface StateHistory {
  past: Event[];
  present: Event | null;
  future: Event[];
}

// Define the type for the context value
interface HistoryContextType {
  history: StateHistory;
  applyEvent: (newEvent: Event) => void;
  undo: () => void;
  redo: () => void;
}

// Create the context
const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

// Provider component
export const HistoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<StateHistory>({ past: [], present: null, future: [] });

  const applyEvent = (newEvent: Event) => {
    setHistory(current => ({
      past: current.present ? [...current.past, current.present] : [...current.past],
      present: newEvent,
      future: []
    }));
  };

  const undo = () => {
    setHistory(current => {
      if (current.past.length === 0) return current;
      const previous = current.past[current.past.length - 1];
      const newPast = current.past.slice(0, -1);

      return {
        past: newPast,
        present: previous,
        future: [current.present, ...current.future].filter(e => e !== null)
      };
    });
  };

  const redo = () => {
    setHistory(current => {
      if (current.future.length === 0) return current;
      const next = current.future[0];
      const newFuture = current.future.slice(1);

      return {
        past: [...current.past, current.present].filter(e => e !== null),
        present: next,
        future: newFuture
      };
    });
  };

  return (
    <HistoryContext.Provider value={{ history, applyEvent, undo, redo }}>
      {children}
    </HistoryContext.Provider>
  );
};

// Hook to use the history context
export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (context === undefined) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
};
