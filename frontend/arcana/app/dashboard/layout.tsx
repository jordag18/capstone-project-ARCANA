import type { Metadata } from 'next'
import React from 'react'

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
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                {children}
            </main>
        </div>
    );
  }



