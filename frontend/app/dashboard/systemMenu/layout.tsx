"use client";
import React, { Children } from "react";

export default function ManageSystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex min-h-screen flex-col items-center justify-between p-24">
      {children}
    </section>
  );
}
