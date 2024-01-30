"use client";
import React from "react";
import NavBar from "../../components/navbar"; // Update the import statement to use lowercase 'navbar'
import Footer from "../../components/footer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { UiRadios } from "react-bootstrap-icons";
import { ArrowRepeat } from "react-bootstrap-icons";
import UserLogTable from "@/app/components/userLogTable";

const ManageUserActivity = () => {
  return (
    <>
      <NavBar />
      <div
        className="flex justify-content-center align-items-center position-absolute top-50 start-50 translate-middle p-2 rounded-full bg-auto "
        style={{ height: "75%", width: "100%" }}>
        <Container className="flex justify-content-center align-items-center border mx-auto p-3 rounded">
          <div className="justify-content-space-between">
            <Row className="justify-content-center align-items-center">
              <div className="d-flex align-items-center mx-auto ">
                <UiRadios size={80} className="p-3 mx-auto" />
                <h2 className="mx-auto">User Activity Logs </h2>
                <Button className="mx-auto ">
                  {" "}
                  <ArrowRepeat /> Refresh{" "}
                </Button>
              </div>
            </Row>
          </div>

          <Container className="flex mx-auto p-3">
            <UserLogTable />
          </Container>

        </Container>
      </div>
      <Footer />
    </>
  );
};
export default ManageUserActivity;
