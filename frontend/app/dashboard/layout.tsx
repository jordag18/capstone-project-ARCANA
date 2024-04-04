import type { Metadata } from 'next'
import React from 'react'
import TopNav from '@/app/ui/navbar'

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
      <div>
        {children}
      </div>
    );
  }



