/**
 * Renders the navigation items for the navbar.
 * @returns The JSX element representing the navigation items.
 */
import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { PcDisplayHorizontal } from "react-bootstrap-icons";
import { Diagram3 } from "react-bootstrap-icons";
import { UiRadios } from "react-bootstrap-icons";
import { Folder2 } from "react-bootstrap-icons";
import { CloudArrowUp } from "react-bootstrap-icons";
import { HouseDoorFill } from "react-bootstrap-icons";

import IconLink from "../ui/iconLink";

export function NavBarItems() {
  return (
    <div>
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
            icon={<PcDisplayHorizontal />}
            linkName="Manage System"
            link="/dashboard/manageSystem"
          />
          <IconLink
            icon={<Folder2 />}
            linkName="Manage Projects"
            link="/dashboard/manageProjects"
          />
          <IconLink
            icon={<CloudArrowUp />}
            linkName="Manage System"
            link="/dashboard/manageSystem"
          />
          <IconLink
            icon={<UiRadios />}
            linkName="Manage Events"
            link="/dashboard/manageEvents"
          />
          <IconLink
            icon={<Diagram3 />}
            linkName="Manage Event Graphs"
            link="/dashboard/manageEventGraphs"
          />
        </Nav>
      </Navbar.Collapse>
      <Navbar.Toggle />
    </div>
  );
}
export default NavBarItems;