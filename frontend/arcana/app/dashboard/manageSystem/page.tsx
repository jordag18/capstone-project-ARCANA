"use client";
import React from "react";
import NavBar from "../../components/navbar"; // Update the import statement to use lowercase 'navbar'
import Footer from "../../components/footer";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import GuiThemeSetter from "@/app/components/guiThemeSetter";
import FontSizer from "@/app/components/fontSizer";
import FontSizeSetter from "@/app/components/fontSetter";

const ManageSystemPage = () => {
  return (
    <>
      <NavBar />
      <div
        className="d-flex justify-content-center align-items-center position-absolute top-50 start-50 translate-middle p-2 rounded-full bg-auto "
        style={{ height: "75%", width: "95%" }}>
        <Container className="flex-fill justify-content-center align-items-center">
          <Accordion defaultActiveKey="0" alwaysOpen className="rounded">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                {" "}
                Graphical User Interface Configuration Settings
              </Accordion.Header>
              <Accordion.Body>
                <div className="container">
                  <div className="row">
                    <div className="col">
                      <GuiThemeSetter />
                    </div>

                    <div className="col">
                      <FontSizeSetter />
                    </div>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>User Settings </Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>
                {" "}
                User and System Activity Logs{" "}
              </Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Container>
      </div>

      <Footer />
    </>
  );
};
export default ManageSystemPage;
