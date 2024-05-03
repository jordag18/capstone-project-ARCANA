import type { Metadata } from "next";
import React from "react";
import { ProjectProvider } from "@/app/contexts/ProjectContext";
import { UndoRedoProvider } from "../contexts/EventHistoryContext";

export const metadata: Metadata = {
  title: "ARCANA-Dashboard",
  description:
    "Advanced Resiliency Chronicling for Analysis in Network Assessments (ARCANA) developed for Data Analysis Centers Cyber Experimentation & Analysis Divison [DAC CEAD]",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProjectProvider>
      <UndoRedoProvider>
        <div className="bg-base-200 flex flex-auto justify-center m-1 p-1 rounded-3xl w-full sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12 2xl:w-7/12">
          {children}
        </div>
      </UndoRedoProvider>
    </ProjectProvider>
  );
}
