import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./components/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

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
        className={`${inter.className} overflow-auto h-full text-slate-700 dark:text-slate-200 dark:bg-slate-700 bg-slate-50/80`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
