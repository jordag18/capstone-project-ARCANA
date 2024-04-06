import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ".//globals.css";
import TopNav from "./ui/navbar";
import Footerbar from "./ui/footerbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ARCANA-TEAM-ONE",
  description:
    "Advanced Resiliency Chronicling for Analysis in Network Assessments (ARCANA) developed for Data Analysis Centers Cyber Experimentation & Analysis Divison [DAC CEAD]",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className + "bg-auto"}>
        <TopNav />
        {/* Flex container with column direction to layout children vertically */}
        {/* Main content*/}
        <div className="bg-slate-300 flex p-5 pb-16 min-h-screen">
          <main className=" flex justify-center flex-auto mx-5 rounded-3xl">
            {children}
          </main>
        </div>
        <Footerbar />
      </body>
    </html>
  );
}
