"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Footer } from "./components/footer";
import StartUpPrompt from "./components/startup-prompt";
import NavBar from "./components/navbar";
//import ThemeHandler from "./util/themeHandler";

export default function Home() {
  const router = useRouter();
  return (
    <>
      {/* //<ThemeHandler /> */}
      <NavBar />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <StartUpPrompt />
      </main>
      <Footer />
    </>
  );
}
