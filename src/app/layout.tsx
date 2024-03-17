import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Footer from "./components/footer/Footer";
import { NextFont } from "next/dist/compiled/@next/font";

const roboto: NextFont = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Pathfinding Visualizer",
  description: "Graph Pathfinding Algorithms Visualizer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} overflow-hidden h-dvh text-slate-700 dark:text-slate-200 dark:bg-slate-700 bg-slate-50/80`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
