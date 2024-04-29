import type { Metadata } from "next";
// flex-col items-center justify-between
export const metadata: Metadata = {
  title: "ARCANA-Projects-Menu",
  description: "",
};

export default function ManageProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="flex p-4 ">{children}</main>
    </>
  );
}
