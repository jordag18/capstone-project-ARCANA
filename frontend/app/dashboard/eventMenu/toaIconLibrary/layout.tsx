import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Icon Library",
  description: "",
};

export default function ToaIconLibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}
