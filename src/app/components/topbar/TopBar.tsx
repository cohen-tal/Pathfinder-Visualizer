"use client";
import { useState } from "react";
import AlgoDropDownMenu from "../dropdown-menu/AlgoDropDownMenu";
import MazeDropDownMenu from "../dropdown-menu/MazeDropDownMenu";
import DarkModeButton from "../buttons/DarkModeButton";
import ResetDropDownMenu from "../dropdown-menu/ResetDropDownMenu";
import { AlgorithmFunction, MazeFunction } from "../../../../types";
import RunAlgorithmButton from "../buttons/RunAlgorithmButton";
import BurgerMenu from "../menu/BurgerMenu";
import Logo from "../Logo";
import LinearProgress from "@mui/material/LinearProgress/LinearProgress";
import { CircularProgress } from "@mui/material";

export interface TopBarProps {
  mobile?: boolean;
  children?: React.ReactNode;
  onAlgorithmClick: (algorithmToRun: AlgorithmFunction) => Promise<void>;
  onMazeClick: (mazeAlgorithmToRun: MazeFunction) => Promise<void>;
  resetAll: () => void;
  resetWalls: () => void;
  resetWeights: () => void;
}

export default function TopBar({
  mobile = false,
  onAlgorithmClick: runAlgorithm,
  onMazeClick: runMazeAlgorithm,
  resetAll,
  resetWalls,
  resetWeights,
}: TopBarProps) {
  const [algorithm, setAlgorithm] = useState<{
    toUse: AlgorithmFunction;
  }>();
  const [isRunning, setIsRunning] = useState<boolean>(false);

  function handleAlgorithmClick(algorithmToUse: AlgorithmFunction) {
    setAlgorithm({ toUse: algorithmToUse });
  }

  function handleMazeClick(mazeAlgorithmToUse: MazeFunction) {
    setIsRunning(true);
    runMazeAlgorithm(mazeAlgorithmToUse).then(() => {
      setIsRunning(false);
    });
  }

  return (
    <div className="w-full pl-2 pr-2 md:pl-0 md:pr-0">
      <div className="flex flex-row items-center md:justify-between w-full h-fit p-4 md:h-14 border-slate-900/10 dark:border-slate-300/10 dark:bg-slate-700 self-center border-b">
        <Logo />
        {mobile && isRunning && (
          <CircularProgress sx={{ padding: "0.5rem" }} color="inherit" />
        )}
        {mobile && !isRunning && (
          <BurgerMenu
            onAlgorithmClick={async (
              algorithm: AlgorithmFunction
            ): Promise<void> => {
              setIsRunning(true);
              await runAlgorithm(algorithm).then(() => {
                setIsRunning(false);
              });
            }}
            onMazeClick={runMazeAlgorithm}
            resetAll={resetAll}
            resetWalls={resetWalls}
            resetWeights={resetWeights}
          />
        )}
        {!mobile && isRunning && (
          <div className=" w-[50%] pr-4">
            <LinearProgress
              sx={{ width: "100%", p: 0.8, borderRadius: 2 }}
              color="inherit"
            />
          </div>
        )}
        {!mobile && !isRunning && (
          <div className="flex flex-row items-center justify-center flex-grow gap-12">
            <AlgoDropDownMenu
              menuName="Algorithms"
              onMenuItemClicked={handleAlgorithmClick}
            />
            {algorithm ? (
              <RunAlgorithmButton
                onClick={() => {
                  setIsRunning(true);
                  runAlgorithm(algorithm.toUse).then(() => {
                    setIsRunning(false);
                    setAlgorithm(undefined);
                  });
                }}
              />
            ) : (
              <p className="font-semibold">Choose an Algorithm</p>
            )}
            <MazeDropDownMenu
              menuName="Mazes"
              onMenuItemClicked={handleMazeClick}
            />
            <ResetDropDownMenu
              menuName="Reset"
              resetAll={resetAll}
              resetWalls={resetWalls}
              resetWeights={resetWeights}
            />
          </div>
        )}
        {!mobile && <DarkModeButton />}
      </div>
    </div>
  );
}
