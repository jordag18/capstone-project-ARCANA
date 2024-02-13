/**
 * Renders the navigation bar component.
 * @returns The rendered navigation bar component.
 */
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import React from "react";
import DacLogo from "../ui/dacLogo";
import ActiveAnalyst from "../ui/activeAnalyst";
import IconLink from "../ui/iconLink";
import Link from "next/link";

import { Diagram3 } from "react-bootstrap-icons";
import { UiRadios } from "react-bootstrap-icons";
import { Folder2 } from "react-bootstrap-icons";
import { CloudArrowUp } from "react-bootstrap-icons";
import { HouseDoorFill } from "react-bootstrap-icons";


export function NavBar() {
  return (
    <>
      <Navbar collapseOnSelect className="bg-body-tertiary align-middle custom-navbar">
        <DacLogo />
        <Navbar.Brand className="mr-auto p-6" style={{ fontSize: "24px", textDecoration: "underline" }}>
          <Link id="link" href="/" className="text-decoration-none text-reset">
              <strong>ARCANA</strong>
          </Link>
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
