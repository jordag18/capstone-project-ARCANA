/**
 * Renders the navigation bar component.
 * @returns The rendered navigation bar component.
 */
import { Diagram3, UiRadios, Folder2, CloudArrowUp, GearWideConnected } from "react-bootstrap-icons";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import ActiveAnalyst from "../ui/activeAnalyst";
import Image from "next/image";
import './navbar.css';

export function NavBar () {
  return (
    <>
      <Navbar expand="lg">
        <Container>
          <Image
            className="p-0"
            src="/devcom_arl.png"
            height={ 80 }
            width={ 180 } 
            alt={ "logo image of DEVCOM" } />
          <Navbar.Brand
            href="/"
          >
            <strong>ARCANA</strong>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            className="justify-items-center"
          />
          <Navbar.Collapse className="navbar-collapse" id="responsive-navbar-nav">
            <Nav>
              <Nav.Link href="/dashboard/projectsMenu" className="mx-md-2">
                <Folder2 className="mb-1" size={50} /> <strong>Manage Projects</strong>
              </Nav.Link>
              <Nav.Link href="/dashboard/syncMenu" className="mx-md-2">
                <CloudArrowUp className="mb-1" size={50} /> <strong>Sync Projects</strong>
              </Nav.Link>
              <Nav.Link href="/dashboard/eventMenu" className="mx-md-2">
                <UiRadios className="mb-1" size={50} /> <strong>Manage Events</strong>
              </Nav.Link>
              <Nav.Link href="/dashboard/eventGraphMenu" className="mx-md-2">
                <Diagram3 className="mb-1" size={50} /> <strong>Manage Graphs</strong>
              </Nav.Link>
              <Nav.Link href="/dashboard/systemMenu" className="mx-md-2">
                <GearWideConnected className="mb-1" size={50} /> <strong>System Settings</strong>
              </Nav.Link>
              <Nav.Link href="/dashboard/eventMenu" className="mx-md-2">
                <strong>Event Menu Test</strong>
              </Nav.Link>
              <Navbar.Text className="navbar-text">Active Analyst: </Navbar.Text>
              <ActiveAnalyst />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
export default NavBar;
