import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "next/image";
import React from "react";
import { ReactNode } from "react";


import { Diagram3 } from 'react-bootstrap-icons';
import { UiRadios } from 'react-bootstrap-icons';
import { Folder2 } from 'react-bootstrap-icons';
import { PcDisplayHorizontal } from 'react-bootstrap-icons';

import { IconLink } from "./iconLink";
import { IconLinkProps } from "./iconLink";



export function NavBar() {
    return (
        <div style={{backgroundColor:'#1b1b1b'}}data-bs-theme="dark">
        <Navbar collapseOnSelect className="bg-body-tertiary align-middle">
                <Navbar.Brand className="p-1">
                    <Image
                        alt="Data Analysis Center's Cyber Experimentation and Analysis Division (DAC CEAD) logo"
                        src="/devcom.png"
                        width={100}
                        height={100}
                        className="d-inline-block align-middle"
                    />{" "}
                </Navbar.Brand>
                <Navbar.Brand className="mr-auto p-6" style={{ fontSize: "24px" }} href="/">
                        <a><strong>ARCANA</strong></a>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" className="justify-center"/>
                        <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="me-auto mb-auto">
                    <IconLink icon={<PcDisplayHorizontal />} linkname="Manage System"/>
                    <IconLink icon={<Diagram3 />} linkname="Manage Graphs"/>
                    <IconLink icon={<UiRadios/>} linkname="Manage Events"/>
                    <IconLink icon={<Folder2/>} linkname="Manage Projects"/>
                </Nav>
            </Navbar.Collapse>
        <Navbar.Toggle/>
        <Navbar.Collapse className="justify-content-end align-middle mb-auto p-1">

        <Navbar.Text className="p-3"> Active Analyst: </Navbar.Text>
                <svg width="100" height="100">
                    <circle cx="50" cy="50" r="50" fill="#f0f0f0"/>
                    <text x="50" y="55" textAnchor="middle" alignmentBaseline="middle" fill="black"> AAA </text>
                </svg>
        </Navbar.Collapse>
    </Navbar>
    </div>
  );
}
export default NavBar;
