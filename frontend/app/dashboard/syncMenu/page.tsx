"use client";
import React, { useState } from "react";
import NavBar from "../../components/navbar"; // Update the import statement to use lowercase 'navbar'
import Footer from "../../components/footer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/esm/Row"; // Import the Button component
import SyncMenuItems from "@/app/components/syncMenuItems";

const SyncProjectsMenu = () => {
  return (
    <>
      <div
        className="flex justify-content-center align-items-center position-absolute top-50 start-50 translate-middle p-2 rounded-full bg-auto "
        style={{ height: "75%", width: "100%" }}>
        <Container className="flex justify-content-center align-items-center border mx-auto p-3 rounded">
          <div className="justify-content-space-between">
            <Row className="justify-content-center align-items-center">
              <div className="d-flex align-items-center mx-auto ">
                <h2 className="mx-auto p-3"> Sync Menu </h2>
              </div>
              <SyncMenuItems />
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};
export default SyncProjectsMenu;
