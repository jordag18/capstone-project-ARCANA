import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Image from "next/image";

export function DacLogo() {
  return (
    <div>
      <Navbar.Brand className="p-1">
        <Image
          alt="Data Analysis Center's Cyber Experimentation and Analysis Division (DAC CEAD) logo"
          src="/devcom.png"
          width={100}
          height={100}
          className="d-inline-block align-middle hidden md:block"
        />{" "}
      </Navbar.Brand>
    </div>
  );
}
export default DacLogo;
