"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Footer } from "./components/footer";
import StartUpPrompt from "./components/startup-prompt";
import StartUpNavBar from "./components/startup-navbar";
import ThemeHandler from "./lib/themeHandler";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <ThemeHandler />
      <StartUpNavBar />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <StartUpPrompt />
      </main>
      <Footer />
    </>
  );
}
