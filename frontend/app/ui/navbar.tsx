'use client'

import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import MoveToNav from "../components/projectComponents/MoveToNav";

const TopNav = () => {
  // State to store fetched initials
  const [initials, setInitials] = useState('');

  // Function to fetch initials from the API
  const fetchInitials = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/getInitials');
      setInitials(response.data.initials);  // Assuming the API returns an object with an 'initials' field
    } catch (error) {
      console.error('Failed to fetch initials:', error);
    }
  };

  // Fetch initials when the component mounts
  useEffect(() => {
    fetchInitials();
  }, []);

  return (
    <div className="navbar bg-black text-neutral-content">
      <div className="navbar-start">
        <div className="w-36">
          <Link href={"/"}>
            <img src="/devcom_arl.png" alt="Logo" />
          </Link>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          <li className="hover:bg-stone-600 rounded-md">
            <MoveToNav linkTo="/" buttonText="ARCANA" />
          </li>
          <li className="hover:bg-stone-600 rounded-md">
            <MoveToNav
              linkTo="/dashboard/projectsMenu"
              buttonText="Manage Projects"
            />
          </li>
          <li className="hover:bg-stone-600 rounded-md">
            <MoveToNav
              linkTo="/dashboard/userActivityMenu"
              buttonText="User Log"
            />
          </li>
          <li className="hover:bg-stone-600 rounded-md">
            <MoveToNav
              linkTo="/dashboard/systemMenu"
              buttonText="System Settings"
            />
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <p className="text-lg font-bold pr-2">Analyst</p>
        <div className="avatar placeholder">
          <div className="bg-stone-600 text-neutral-content rounded-full w-12">
            {initials ? (
              <span className="text-2xl">{initials}</span>
            ) : (
              <span className="text-2xl">?</span>  // Placeholder if initials are not loaded
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
