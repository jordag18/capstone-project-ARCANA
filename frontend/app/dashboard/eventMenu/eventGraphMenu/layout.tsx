import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ARCANA-Manage-Event-Graphs",
  description: "",
};

export default function ManageEventGraphsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {children}
      </main>
    </>
  );
}
