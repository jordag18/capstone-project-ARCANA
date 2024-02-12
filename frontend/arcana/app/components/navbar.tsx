/**
 * Renders the navigation bar component.
 * @returns The rendered navigation bar component.
 */
import Navbar from "react-bootstrap/Navbar";
import React from "react";
import DacLogo from "../ui/dacLogo";
import NavBarItems from "./navItems";
import ActiveAnalyst from "../ui/activeAnalyst";

import "./styles/navbar.css"


export function NavBar() {
  return (
    <>
      <Navbar collapseOnSelect className="bg-body-tertiary align-middle custom-navbar">
        <DacLogo />
        <NavBarItems />
        <ActiveAnalyst />
      </Navbar>
    </>
  );
}
export default NavBar;
