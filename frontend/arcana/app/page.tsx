'use client';
import React from 'react';
import { useRouter } from 'next/navigation'
import NavBar from './components/navbar';
import { Footer } from './components/footer';
import StartUpPrompt from './components/startup-prompt';
//import ModeToggle from './ui/mode-toggle';

export default function Home() {
  const router = useRouter();
  return (
  <>
    <NavBar/>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <StartUpPrompt/>
    </main>
    <Footer/>
  </>
  )
}
