"use client";
import React from "react";
import NavBar from "../../components/navbar"; // Update the import statement to use lowercase 'navbar'
import Footer from "../../components/footer";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import  AccordionItem from "react-bootstrap";
import ColorModeSwitcher from "@/app/components/colorMode";

const ManageSystemPage = () => {
  return (
    <>
      <NavBar />
      <div
        className="d-flex justify-content-center align-items-center position-absolute top-50 start-50 translate-middle p-2 rounded-full bg-auto "
        style={{ height: "75%", width: "95%" }}>
        <Container className="flex-fluid justify-content-center align-items-center">
          <Accordion defaultActiveKey="0" alwaysOpen className="rounded">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                {" "}
                Graphical User Interface Configuration Settings
              </Accordion.Header>
              <Accordion.Body>
                <div className="container overflow-hidden">
                  <div className="row">
                    <div className="col">
                      <Card className="align-center">
                        <Card.Body>
                          <Card.Title> GUI Theme </Card.Title>
                          <Card.Text>
                            Specify the theme of the GUI. This will change the
                            color
                          </Card.Text>
                          <div className="text-center align-middle">
                            <ColorModeSwitcher
                              toggleColorMode={function (): void {
                                throw new Error("Function not implemented.");
                              }}
                            />
                          </div>
                        </Card.Body>
                      </Card>
                    </div>

                    <div className="col">
                      <Card>
                        <Card.Body>
                          <Card.Title> Font Size </Card.Title>
                          <Card.Text>
                            Specify the size of the font in the GUI.
                          </Card.Text>
                          <div className="text-center align-middle">
                            {/* Enter Font Changing Method here  */}
                          </div>
                        </Card.Body>
                      </Card>
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
