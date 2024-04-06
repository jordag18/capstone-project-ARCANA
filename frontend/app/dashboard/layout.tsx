import type { Metadata } from 'next'
import React from 'react'
import { ProjectProvider } from '@/app/contexts/ProjectContext'

export const metadata: Metadata = {
    title: 'ARCANA-Dashboard',
    description: 'Advanced Resiliency Chronicling for Analysis in Network Assessments (ARCANA) developed for Data Analysis Centers Cyber Experimentation & Analysis Divison [DAC CEAD]',
}

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <ProjectProvider>
        {children}
      </ProjectProvider>
    );
  }



