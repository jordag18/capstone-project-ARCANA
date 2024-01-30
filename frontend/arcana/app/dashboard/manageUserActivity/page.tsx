"use client";
import React from "react";
import NavBar from "../../components/navbar"; // Update the import statement to use lowercase 'navbar'
import Footer from "../../components/footer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

import { UiRadios } from "react-bootstrap-icons";
import {ArrowRepeat} from "react-bootstrap-icons";

const ManageUserActivity = () => {
  return (
    <>
      <NavBar />
      <div
        className="flex justify-content-center align-items-center position-absolute top-50 start-50 translate-middle p-2 rounded-full bg-auto"
        style={{ height: "75%", width: "100%" }}>
            <Container className="flex justify-content-center align-items-center">
            <div className="justify-content-space-between">
                <Row className="justify-content-center align-items-center">
                    <div className="d-flex align-items-center mx-auto ">
                        <UiRadios size={72}/>
                        <h2 className="mx-auto">User Activity Logs </h2>
                        <Button> <ArrowRepeat /> Refresh </Button>
                    </div>
                </Row>

            </div>


                <Container>
                <ul>
                    <li>[NM] [11/24/2023, 9:17] /Desktop/logs/File ingested in Project A.</li>
                    <li>[NM] [11/24/2023, 9:17] /Desktop/logs/File ingested in Project A.</li>
                    <li>[NM] [11/24/2023, 9:16] /Desktop/logs/File ingested in Project A.</li>
                    <li>[NM] [11/24/2023, 9:15] Project A created.</li>
                </ul>
                </Container>



                    {/* Insert code for user activity logs here */}
                </Container>
            </div>
      <Footer />
    </>
  );
};
export default ManageUserActivity;
