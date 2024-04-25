"use client";
import React, { Children } from "react";

export default function ManageUserActivity({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex-1 bg-base-200 rounded-r-3xl">{children}</div>;
}
