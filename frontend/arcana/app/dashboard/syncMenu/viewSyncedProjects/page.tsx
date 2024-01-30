"use client";

import React from "react";
import NavBar from "../../../components/navbar";
import Footer from "../../../components/footer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import { FolderSymlink } from "react-bootstrap-icons";

function ViewSyncedProjects() {
  return (
    <>
      <NavBar />
      <div
        className="flex justify-content-center align-items-center position-absolute top-50 start-50 translate-middle p-2 rounded-full bg-auto "
        style={{ height: "75%", width: "100%" }}>
        <Container className="flex justify-content-center align-items-center border mx-auto p-3 rounded">
          <div className="justify-content-space-between">
            <Row className="justify-content-center align-items-center p-2 mx-auto">
              <div className="d-flex align-items-center p-2">
                {" "}
                {/* Changed class to 'd-flex' for inline display */}
                <FolderSymlink size={80} />
                <h2 className="mx-3 p-3 align-middle">Sync Requests</h2>
              </div>
            </Row>
          </div>

          <Container className="flex mx-auto p-3">

          </Container>
        </Container>
      </div>
      <Footer />
    </>
  );
}
export default ViewSyncedProjects;
