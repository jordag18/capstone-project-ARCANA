import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-icons'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ARCANA-TEAM-ONE',
  description: 'Advanced Resiliency Chronicling for Analysis in Network Assessments (ARCANA) developed for Data Analysis Centers Cyber Experimentation & Analysis Divison [DAC CEAD]',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-bs-theme="light">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}