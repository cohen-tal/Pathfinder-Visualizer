import { useState } from "react";
import { motion, useCycle, AnimatePresence } from "framer-motion";
import AlgoDropDownMenu from "../dropdown-menu/AlgoDropDownMenu";
import MazeDropDownMenu from "../dropdown-menu/MazeDropDownMenu";
import DarkModeButton from "../buttons/DarkModeButton";
import ResetDropDownMenu from "../dropdown-menu/ResetDropDownMenu";
import RunAlgorithmButton from "../buttons/RunAlgorithmButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { TopBarProps } from "../topbar/TopBar";
import Logo from "../Logo";
import { AlgorithmFunction, MazeFunction } from "../../../../types";

export default function BurgerMenu({
  children,
  onAlgorithmClick,
  onMazeClick,
  resetAll,
  resetWalls,
  resetWeights,
}: TopBarProps) {
  const [isOpen, toggle] = useCycle(false, true);

  return (
    <>
      <div className="ml-auto">
        <button
          onClick={() => {
            toggle();
          }}
        >
          <MenuIcon />
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <div className="flex flex-col items-end backdrop-blur-sm fixed inset-0 z-40 bg-black bg-opacity-10">
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0, transition: { duration: 0.3 } }}
              exit={{ opacity: 0, x: "100%", transition: { duration: 0.15 } }}
              className="fixed right-0 bottom-0 top-0 w-[15.5rem] flex flex-col items-center justify-start gap-6 border bg-white dark:bg-slate-700"
            >
              <div className="flex flex-row items-center justify-between p-2.5 w-full border-b">
                <Logo size="small" showText={false} />
                <button
                  onClick={() => {
                    toggle();
                  }}
                >
                  <CloseIcon />
                </button>
              </div>
              <AlgoDropDownMenu
                menuName="Algorithms"
                onMenuItemClicked={(algorithm: AlgorithmFunction) => {
                  toggle();
                  onAlgorithmClick(algorithm);
                }}
              />
              <MazeDropDownMenu
                menuName="Mazes"
                onMenuItemClicked={(maze: MazeFunction) => {
                  toggle();
                  onMazeClick(maze);
                }}
              />
              <ResetDropDownMenu
                menuName="Reset"
                resetAll={resetAll}
                resetWalls={resetWalls}
                resetWeights={resetWeights}
              />
              {children}
              <DarkModeButton />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
