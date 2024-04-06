import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './/globals.css'
import TopNav from './ui/navbar'
import Footerbar from './ui/footerbar'

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
    <html lang="en" data-theme="light">
      <body className={inter.className + " bg-base-200"}>
        <TopNav />
        <div className="flex flex-col min-h-screen pb-20">
          {/*main content container */}
          <main className="flex-1 container mx-auto px-4 md:px-2 p-10">
            <div className="bg-base-100 rounded-lg p-4 shadow">
                {children}
            </div>
          </main>
          <Footerbar />
        </div>
      </body>
    </html>
  );
}