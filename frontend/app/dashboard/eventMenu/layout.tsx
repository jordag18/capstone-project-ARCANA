import type { Metadata } from "next";
import Sidebar from "@/app/ui/sidebar";

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
    <div className="flex w-full">
      <Sidebar />
      <div className="flex-1 bg-base-200 rounded-r-3xl">{children}</div>
    </div>
  );
}
