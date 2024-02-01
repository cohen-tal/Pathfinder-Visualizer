"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import AlgoDropDownMenu from "../dropdown-menu/AlgoDropDownMenu";
import MazeDropDownMenu from "../dropdown-menu/MazeDropDownMenu";
import DarkModeButton from "../buttons/DarkModeButton";
import Image from "next/image";
import Link from "next/link";

export interface TopBarProps {
  alogrithm: (algoToUse: string) => void;
}

export default function TopBar({ alogrithm }: TopBarProps) {
  const [algorithmToUse, setAlgorithmToUse] = useState<string>("Visualize!");

  const handleOnAlgorithmClicked = (algo: string) => {
    setAlgorithmToUse(algo);
  };

  const renderVisualizeButton = (isChosen: boolean) => {
    if (isChosen) {
      return (
        <motion.button
          className="font-semibold hover:text-white/90 dark:hover:text-sky-500 bg-sky-600/50 dark:bg-sky-500/30 border border-sky-600/30 rounded-md p-1"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            alogrithm(algorithmToUse);
          }}
        >
          {algorithmToUse}
          <PlayArrowRoundedIcon />
        </motion.button>
      );
    } else {
      return (
        <div className="min-w-[196px] flex justify-center items-center">
          <button className="font-semibold" disabled>
            Visualize!
          </button>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-row items-center justify-center gap-12 w-full h-14 border-slate-900/10 dark:border-slate-300/10 dark:bg-slate-700 top-0 self-center border-b">
      <div className="absolute left-6 flex flex-row items-center" >
      <Image src="/logo.png" width={50} height={50} alt="logo" />
      <h1 className="font-semibold text-2xl p-4">Graphical Graph Visualizer</h1>
      </div>
      <AlgoDropDownMenu
        menuName="Algorithms"
        onMenuItemClicked={handleOnAlgorithmClicked}
      />
      {renderVisualizeButton(algorithmToUse !== "Visualize!")}
      <MazeDropDownMenu menuName="Mazes" onMenuItemClicked={() => {}} />
      <DarkModeButton />
    </div>
  );
}
