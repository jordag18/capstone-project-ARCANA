import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { HouseDoorFill } from "react-bootstrap-icons";
import AnalystIcon from "./analystIcon";

import IconLink from "../ui/iconLink";
export function ActiveAnalyst() {
  return (
    <>
      <Navbar.Collapse className="justify-content-end align-middle mb-auto p-1">
        <Navbar.Text className="p-1"> Active Analyst: </Navbar.Text>
        <AnalystIcon />
      </Navbar.Collapse>
    </>
  );
}
export default ActiveAnalyst;