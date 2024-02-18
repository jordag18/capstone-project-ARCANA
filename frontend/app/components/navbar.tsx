/**
 * Renders the navigation bar component.
 * @returns The rendered navigation bar component.
 */
import { Diagram3, UiRadios, Folder2, CloudArrowUp, HouseDoorFill, GearWideConnected } from "react-bootstrap-icons";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import ActiveAnalyst from "../ui/activeAnalyst";
import Image from "next/image";
import './navbar.css';

export function NavBar () {
  return (
    <>
      <Navbar>
        <Image
          className="p-0 logo-margin"
          src="/devcom_arl.png"
          height={ 100 }
          width={ 200 } 
          alt={ "logo image of DAC CEAD organization." } />
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
            <Nav.Link href="/" className="mx-md-2">
              <HouseDoorFill className="mb-1" /> <strong>Home</strong>
            </Nav.Link>
            <Nav.Link href="/dashboard/projectsMenu" className="mx-md-2">
              <Folder2 className="mb-0" /> <strong>Manage Projects</strong>
            </Nav.Link>
            <Nav.Link href="/dashboard/syncMenu" className="mx-md-2">
              <CloudArrowUp className="mb-0" /> <strong>Sync Projects</strong>
            </Nav.Link>
            <Nav.Link href="/dashboard/eventMenu" className="mx-md-2">
              <UiRadios className="mb-1" /> <strong>Manage Events</strong>
            </Nav.Link>
            <Nav.Link href="/dashboard/eventGraphMenu" className="mx-md-2">
              <Diagram3 className="mb-0" /> <strong>Manage Event Graphs</strong>
            </Nav.Link>
            <Nav.Link href="/dashboard/systemMenu" className="mx-md-2">
              <GearWideConnected className="mb-1" /> <strong>Manage System Settings</strong>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <ActiveAnalyst />
      </Navbar>
    </>
  );
}
export default NavBar;
