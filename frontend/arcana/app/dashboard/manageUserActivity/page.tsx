"use client";
import React from "react";
import NavBar from "../../components/navbar"; // Update the import statement to use lowercase 'navbar'
import Footer from "../../components/footer";
import Container from "react-bootstrap/Container";

import { UiRadios } from "react-bootstrap-icons";


const ManageUserActivity = () => {
  return (
    <>
      <NavBar />
      <div
        className="flex justify-content-center align-items-center position-absolute top-50 start-50 translate-middle p-2 rounded-full bg-auto"
        style={{ height: "75%", width: "100%" }}>
            <Container className="flex justify-content-center align-items-center">
            <div>
                <Container className="flex justify-content-center align-items-center">
                    <div className="mt-4">
                    <UiRadios size={72} className="mx-auto mb-auto p-2"/>
                    <h2>User Activity Logs</h2>
                    </div>

                    {/* Insert code for user activity logs here */}
                </Container>
            </div>
            </Container>
        </div>
      <Footer />
    </>
  );
};
export default ManageUserActivity;
