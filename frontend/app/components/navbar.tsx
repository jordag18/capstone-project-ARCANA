/**
 * Renders the navigation bar component.
 * @returns The rendered navigation bar component.
 */
import { Diagram3, UiRadios, Folder2, CloudArrowUp, HouseDoorFill } from "react-bootstrap-icons";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import ActiveAnalyst from "../ui/activeAnalyst";


export function NavBar() {
  return (
    <>
      <Navbar collapseOnSelect className="bg-body-tertiary align-middle custom-navbar">
        <Navbar.Brand 
          className="mr-auto p-6" 
          style={{ fontSize: "24px", textDecoration: "underline", color: "black" }}
          href="/"
          >
            <img
              className="p-1"
              src="/devcom.png"
              height={100}
              width={100}
            />
          <strong>ARCANA</strong>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="justify-center"
        />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto mb-auto">
              <Nav.Link href="/">
                <HouseDoorFill className="mb-auto" /> Home
              </Nav.Link>
              <Nav.Link href="/dashboard/projectsMenu">
                <Folder2 className="mb-auto" /> Manage Projects
              </Nav.Link>
              <Nav.Link href="/dashboard/syncMenu">
                <CloudArrowUp className="mb-auto"/> Sync Projects
              </Nav.Link>
              <Nav.Link href="/dashboard/eventMenu">
                <UiRadios className="mb-auto"/> Manage Events
              </Nav.Link>
              <Nav.Link href="/dashboard/eventGraphMenu">
                <Diagram3 className="mb-auto"/> Manage Event Graphs
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        <Navbar.Toggle />
        <ActiveAnalyst />
      </Navbar>
    </>
  );
}
export default NavBar;
