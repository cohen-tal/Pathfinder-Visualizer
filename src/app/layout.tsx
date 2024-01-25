import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
        className={`${inter.className} overflow-hidden w-full h-[100dvh] text-slate-700 dark:text-slate-200 dark:bg-slate-700`}
      >
        {children}
      </body>
    </html>
  );
}
