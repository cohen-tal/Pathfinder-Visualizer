import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./components/navbar/GraphControls";
import "./globals.css";
import { useContext } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Graph Visualizer",
  description: "Graph Algorithms Visualizer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} overflow-hidden bg-slate-100 dark:bg-cyan-900`}
      >
        {/* <NavBar /> */}
        {children}
      </body>
    </html>
  );
}
