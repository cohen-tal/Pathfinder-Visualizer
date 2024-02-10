"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import AlgoDropDownMenu from "../dropdown-menu/AlgoDropDownMenu";
import MazeDropDownMenu from "../dropdown-menu/MazeDropDownMenu";
import DarkModeButton from "../buttons/DarkModeButton";
import Image from "next/image";
import ResetDropDownMenu from "../dropdown-menu/ResetDropDownMenu";
import Graph from "@/classes/graph";
import { AlgorithmFunction, MazeFunction } from "../../../../types";
import RunAlgorithmButton from "../buttons/RunAlgorithmButton";

export interface TopBarProps {
  onAlgorithmClick: (algorithmToRun: AlgorithmFunction) => void;
  onMazeClick: (mazeAlgorithmToRun: MazeFunction) => void;
  resetAll: () => void;
  resetWalls: () => void;
  resetWeights: () => void;
}

export default function TopBar({
  onAlgorithmClick: runAlgorithm,
  onMazeClick: runMazeAlgorithm,
  resetAll,
  resetWalls,
  resetWeights,
}: TopBarProps) {
  const [algorithm, setAlgorithm] = useState<{
    toUse: AlgorithmFunction;
  }>();

  function handleAlgorithmClick(algorithmToUse: AlgorithmFunction) {
    setAlgorithm({ toUse: algorithmToUse });
  }

  return (
    <div className="flex flex-row items-center justify-between w-full h-14 border-slate-900/10 dark:border-slate-300/10 dark:bg-slate-700 top-0 self-center border-b">
      <div className="flex flex-row items-center ml-2">
        <Image src="/logo.png" width={50} height={50} alt="logo" />
        <h1 className="font-semibold text-2xl p-4">Pathfinder Visualizer</h1>
      </div>
      <div className="flex flex-row items-center justify-center flex-grow gap-12">
        <AlgoDropDownMenu
          menuName="Algorithms"
          onMenuItemClicked={handleAlgorithmClick}
        />
        {algorithm ? (
          <RunAlgorithmButton
            onClick={() => {
              runAlgorithm(algorithm.toUse);
            }}
          />
        ) : (
          <p className="font-semibold">Choose an Algorithm</p>
        )}
        <MazeDropDownMenu
          menuName="Mazes"
          onMenuItemClicked={runMazeAlgorithm}
        />
        <ResetDropDownMenu
          menuName="Reset"
          resetAll={resetAll}
          resetWalls={resetWalls}
          resetWeights={resetWeights}
        />
      </div>
      <DarkModeButton />
    </div>
  );
}
