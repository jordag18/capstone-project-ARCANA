import Navbar from "react-bootstrap/Navbar";
import React from "react";
import Link from "next/link";

export function ArcanaTextLogo() {
  return (
    <div style={{ paddingTop: "30px" }}>
      <Navbar.Brand className="mr-auto p-6" style={{ fontSize: "24px", textDecoration: "underline" }}>
          <Link id="link" href="/" className="text-decoration-none text-reset">
              <strong>ARCANA</strong>
          </Link>
      </Navbar.Brand>
    </div>
  );
}

export default ArcanaTextLogo;
