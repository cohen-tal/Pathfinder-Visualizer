import { motion, useCycle } from "framer-motion";
import MenuToggleButton from "./MenuToggleButton";
import { ReactNode, createContext, useRef } from "react";
import { ClickAwayListener } from "@mui/material";

export interface DropDownMenuProps {
  menuName: string;
  isItemClicked?: boolean;
  children?: ReactNode;
}

export const DropDownMenuContext = createContext<() => void>(() => {});

const flex = {
  open: {
    x: 0,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

export default function DropDownMenu({
  children,
  menuName,
  isItemClicked = false,
}: DropDownMenuProps) {
  const [open, toggleOpen] = useCycle(false, true);
  const ToggleButtonRef = useRef<HTMLDivElement>(null);

  return (
    <ClickAwayListener
      onClickAway={() => {
        open && ToggleButtonRef.current?.click();
      }}
    >
      <div
        className={
          isItemClicked
            ? "flex flex-col items-center gap-1 border rounded-md p-1 bg-sky-500/15 dark:bg-slate-700/5"
            : "flex flex-col items-center gap-1"
        }
      >
        <MenuToggleButton
          buttonText={menuName}
          onClick={() => {
            toggleOpen();
          }}
          compRef={ToggleButtonRef}
        />
        {open && (
          <motion.div
            className={
              "md:absolute md:mt-10 min-w-max flex flex-col p-[5px] z-50 bg-transparent md:bg-white md:dark:bg-slate-700 border-slate-900/10 dark:border-slate-300/10 md:rounded md:border-[1px] md:shadow-lg"
            }
            initial="closed"
            animate={"open"}
            variants={flex}
          >
            <DropDownMenuContext.Provider
              value={() => ToggleButtonRef.current?.click()}
            >
              {children}
            </DropDownMenuContext.Provider>
          </motion.div>
        )}
      </div>
    </ClickAwayListener>
  );
}
