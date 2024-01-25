"use client";
import { useEffect, useState } from "react";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import ModeNightOutlinedIcon from "@mui/icons-material/ModeNightOutlined";

export default function DarkModeButton() {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const savedTheme: string | null = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="absolute flex flex-row right-40 pb-0.5">
      <div className="w-[1px] h-15 bg-slate-900/10 dark:bg-slate-300/10 mr-5" />
      <div className="flex flex-row items-center justify-center border z-50 bg-white/70 dark:bg-slate-700/70 border-slate-900/10 dark:border-slate-300/10 rounded-[4px]">
        <button
          className="hover:cursor-pointer hover:bg-sky-600/50 dark:hover:text-white dark:hover:bg-sky-600/70 rounded-[2px] border-slate-900/10 dark:border-slate-300/10 h-full w-full p-2.5"
          onClick={() => setDarkMode(false)}
        >
          {darkMode ? (
            <LightModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon className="fill-sky-500" />
          )}
        </button>
        <div className="w-[4px] h-11 bg-slate-900/10 dark:bg-slate-300/10" />
        <button
          className="hover:cursor-pointer hover:bg-sky-600/50 dark:hover:text-white dark:hover:bg-sky-600/70 rounded-[2px] w-full p-2.5"
          onClick={() => setDarkMode(true)}
        >
          {darkMode ? (
            <ModeNightOutlinedIcon className="fill-sky-600" />
          ) : (
            <ModeNightOutlinedIcon />
          )}
        </button>
      </div>
    </div>
  );
}
