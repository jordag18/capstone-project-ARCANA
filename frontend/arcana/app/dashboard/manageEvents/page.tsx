'use client';
import React from "react";
import NavBar from "../../components/navbar"; // Update the import statement to use lowercase 'navbar'
import Footer from "../../components/footer";


const ManageEventsPage = () => {
    return (
      <>
        <NavBar />
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <h1>Manage Events Dashboard</h1>
        </main>
        <Footer />
      </>
    );
}
export default ManageEventsPage;

