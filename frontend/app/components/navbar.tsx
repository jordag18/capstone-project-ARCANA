/**
 * Renders the navigation bar component.
 * @returns The rendered navigation bar component.
 */
import { Diagram3, UiRadios, Folder2, CloudArrowUp, HouseDoorFill } from "react-bootstrap-icons";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import ActiveAnalyst from "../ui/activeAnalyst";
import IconLink from "../ui/iconLink";


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
            <IconLink
              icon={<HouseDoorFill />}
              linkName="Home"
              link="/"
            />
            <IconLink
              icon={<Folder2 />}
              linkName="Manage Projects"
              link="/dashboard/projectsMenu"
            />
            <IconLink
              icon={<CloudArrowUp />}
              linkName="Sync Projects"
              link="/dashboard/syncMenu"
            />
            <IconLink
              icon={<UiRadios />}
              linkName="Manage Events"
              link="/dashboard/eventMenu"
            />
            <IconLink
              icon={<Diagram3 />}
              linkName="Manage Event Graphs"
              link="/dashboard/eventGraphMenu"
            />
          </Nav>
        </Navbar.Collapse>
        <Navbar.Toggle />
        <ActiveAnalyst />
      </Navbar>
    </>
  );
}
export default NavBar;
