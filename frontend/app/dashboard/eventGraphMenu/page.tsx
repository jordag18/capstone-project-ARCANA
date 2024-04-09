'use client';
import React from "react";
import NavBar from "../../components/navbar"; // Update the import statement to use lowercase 'navbar'
import Footer from "../../components/footer";
import Container from 'react-bootstrap/Container';
import Sidebar from "@/app/components/sidebar";
//import ThemeHandler from "@/app/lib/themeHandler";

const ManageEventGraphsPage = () => {
    return (
      <div> <Sidebar/>
        {/* <ThemeHandler /> */}
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
          <Container className="d-flex justify-content-center align-items-center position-absolute top-50 start-50 translate-middle rounded bg-light" style={{ width: '800px', height: '500px' }}>
            <h1>Manage Event Graphs Dashboard</h1>
          </Container>
        </div>
      </div>
    );
}
export default ManageEventGraphsPage;