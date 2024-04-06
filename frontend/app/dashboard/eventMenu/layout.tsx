import type { Metadata } from "next";

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
    <div>{children}</div>
  );
}
