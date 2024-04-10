import type { Metadata } from "next";
import Sidebar from "@/app/components/sidebar";

export const metadata: Metadata = {
  title: "ARCANA-Manage-Events",
  description: "",
};

export default function ManageEventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};
