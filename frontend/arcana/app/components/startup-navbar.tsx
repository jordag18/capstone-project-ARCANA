import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React from "react";

import { PcDisplayHorizontal } from "react-bootstrap-icons";
import {IconLink}  from "../ui/iconLink";
import {AnalystIcon} from "../ui/analystIcon";
import {DacLogo} from "../ui/dacLogo";
import {ArcanaTextLogo} from "../ui/arcanaTextLogo";

export function StartUpNavBar() {
  return (
    <div>
      <Navbar collapseOnSelect className="bg-body-tertiary align-middle">
        <DacLogo/>
        <ArcanaTextLogo/>

        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="justify-center"
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto mb-auto">
            <IconLink icon={<PcDisplayHorizontal />} linkName="Manage System" link="/dashboard/manageSystem" />
          </Nav>
        </Navbar.Collapse>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end align-middle mb-auto p-1">
          <Navbar.Text className="p-1"> Active Analyst: </Navbar.Text>
          <AnalystIcon />
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
export default StartUpNavBar;
