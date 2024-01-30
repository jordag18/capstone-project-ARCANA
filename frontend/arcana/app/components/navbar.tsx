/**
 * Renders the navigation bar component.
 * @returns The rendered navigation bar component.
 */
import Navbar from "react-bootstrap/Navbar";
import React from "react";

import DacLogo from "../ui/dacLogo";
import ArcanaTextLogo from "../ui/arcanaTextLogo";
import NavBarItems from "./navItems";
import ActiveAnalyst from "../ui/activeAnalyst";

export function NavBar() {
  return (
    <>
      <Navbar collapseOnSelect className="bg-body-tertiary align-middle">
        <DacLogo />
        <ArcanaTextLogo />
        <NavBarItems />
        <ActiveAnalyst />
      </Navbar>
    </>
  );
}
export default NavBar;
