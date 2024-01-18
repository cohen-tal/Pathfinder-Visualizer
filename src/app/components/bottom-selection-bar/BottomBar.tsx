import React from "react";

export interface BottomBarProps {
  children?: React.ReactNode;
}

export default function BottomBar({ children }: BottomBarProps) {
  return (
    <div className="flex flex-row items-center justify-center w-full h-6 border-t">
      {children}
    </div>
  );
}
