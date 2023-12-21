'use client';
import React from "react";
import NavBar from '../components/navbar';
import Footer from '../components/footer';


export default function DashBoardPage() {
    return (
      <>
        <NavBar />
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <h1>Dashboard</h1>
        </main>
        <Footer />
      </>
    );
}

