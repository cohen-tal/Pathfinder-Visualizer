import React from "react";
import Image from "next/image";

export interface LogoProps {
  size?: "small" | "default";
  showText?: boolean;
}

export default function Logo({ size = "default", showText = true }: LogoProps) {
  if (size === "default") {
    return (
      <div className="flex flex-row items-center">
        <Image src="/logo.png" width={45} height={45} alt="logo" />
        {showText && (
          <h1 className="font-semibold text-2xl md:text-xl pl-2 md:p-2">
            Pathfinder Visualizer
          </h1>
        )}
      </div>
    );
  } else {
    return (
      <div className="flex flex-row items-center">
        <Image src="/logo.png" width={30} height={30} alt="logo" />
        {showText && (
          <h1 className="font-semibold text-sm md:text-lg m-0 pl-2 md:p-2">
            Pathfinder
          </h1>
        )}
      </div>
    );
  }
}
