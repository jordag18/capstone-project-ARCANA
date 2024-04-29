import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ARCANA-Sync-Projects",
  description: "",
};

export default function SyncProjectsLayout({
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
