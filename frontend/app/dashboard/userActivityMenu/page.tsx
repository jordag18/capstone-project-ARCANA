"use client";
import React, { useState } from "react";
import NavBar from "../../components/navbar";
import Footer from "../../components/footer";
import { Row, Button, Container } from "react-bootstrap";
import { UiRadios, ArrowRepeat } from "react-bootstrap-icons";
import UserLogTable from "@/app/components/userLogTable";

const ManageUserActivity = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  // Function to handle refresh
  const handleRefresh = () => {
    setRefreshTrigger(!refreshTrigger); // Toggle the state to trigger a re-render
  };

  return (
    <>
      <NavBar />
      <div
        className="flex justify-content-center align-items-center position-absolute top-50 start-50 translate-middle p-2 rounded-full bg-auto "
        style={{ height: "75%", width: "100%" }}
      >
        <Container className="flex justify-content-center align-items-center border mx-auto p-3 rounded">
          <div className="justify-content-space-between">
            <Row className="justify-content-center align-items-center">
              <div className="d-flex align-items-center mx-auto ">
                <UiRadios size={80} className="p-3 mx-auto" />
                <h2 className="mx-auto">User Activity Logs </h2>
                <Button className="mx-auto p-2" onClick={handleRefresh}>
                  <ArrowRepeat size={24} /> Refresh{" "}
                </Button>
              </div>
            </Row>
          </div>
          <Container className="flex mx-auto p-3">
            <UserLogTable key={refreshTrigger ? "refresh" : "no-refresh"} /> {/* Add key prop to trigger re-render */}
          </Container>
        </Container>
      </div>
      <Footer />
    </>
  );
};
export default ManageUserActivity;
