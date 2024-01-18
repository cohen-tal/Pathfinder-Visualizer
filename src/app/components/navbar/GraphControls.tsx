"use client";
import React from "react";

export default function GraphControls() {
  return (
    <div className=" bg-slate-100 dark:bg-cyan-900 backdrop-blur flex flex-row items-center justify-center gap-24 w-full h-16 border-b ">
      <div className="ml-4 text-sm leading-6 font-semibold text-slate-700 dark:text-slate-200">
        <ul className="flex space-x-8">
          <li
            role="button"
            onClick={() => {
              console.log("clicked");
            }}
            className="hover:text-sky-500 dark:hover:text-sky-400"
          >
            text1
          </li>
          <li className="hover:text-sky-500 dark:hover:text-sky-400">text2</li>
        </ul>
      </div>
    </div>
  );
}
