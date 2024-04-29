import React from "react";
import Navbar from "react-bootstrap/Navbar";
import AnalystIcon from "./analystIcon";

export function ActiveAnalyst() {
  return (
    <>
      <Navbar.Collapse>
        <AnalystIcon />
      </Navbar.Collapse>
    </>
  );
}
export default ActiveAnalyst;
