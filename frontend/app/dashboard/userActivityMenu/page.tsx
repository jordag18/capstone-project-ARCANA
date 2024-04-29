"use client";
import React, { useState } from "react";
import { UiRadios, ArrowRepeat } from "react-bootstrap-icons";
import UserLogTable from "@/app/components/userLogTable";

const ManageUserActivity = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  // Function to handle refresh
  const handleRefresh = () => {
    setRefreshTrigger(!refreshTrigger); // Toggle the state to trigger a re-render
  };

  return (
    <div className="flex flex-auto flex-col mx-0 rounded-3xl p-3 ">
      <div
        className="flex flex-row items-center justify-center w-full rounded-3xl pr-5"
        style={{ paddingBottom: 15 }}>
        <UiRadios size={35} style={{ paddingRight: 5 }} />
        <h1
          className="text-3xl font-semibold pl-5"
          style={{ paddingRight: 50 }}>
          User Activity Logger
        </h1>
        <button
          className="btn bg-blue-500 text-white shadow-md hover:bg-blue-600"
          onClick={handleRefresh}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-repeat"
            viewBox="0 0 16 16">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9"
            />

            <path
              fillRule="evenodd"
              d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"
            />
          </svg>
          Refresh
        </button>
      </div>
      <br></br>
      <div className="flex justify-center items-center">
        <UserLogTable key={refreshTrigger ? "refresh" : "no-refresh"} />
      </div>
    </div>
  );
};
export default ManageUserActivity;
