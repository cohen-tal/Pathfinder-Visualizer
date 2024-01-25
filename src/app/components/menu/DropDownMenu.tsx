import { motion, useCycle } from "framer-motion";
import MenuToggleButton from "./MenuToggleButton";
import { ReactNode, createContext, useRef } from "react";

export interface DropDownMenuProps {
  menuName: string;
  children?: ReactNode;
}

export const DropDownMenuContext = createContext<() => void>(() => {
  console.log("MenuContext");
});

const flex = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

export default function DropDownMenu({
  children,
  menuName,
}: DropDownMenuProps) {
  const [open, toggleOpen] = useCycle(false, true);
  const ToggleButtonRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col items-center gap-1">
      <MenuToggleButton
        buttonText={menuName}
        onClick={() => toggleOpen()}
        compRef={ToggleButtonRef}
      />
      {open && (
        <motion.div
          className="absolute top-10 mt-2 min-w-max flex flex-col p-[px] z-50 bg-white/70 dark:bg-slate-700/70 border-slate-900/10 dark:border-slate-300/10 rounded border-[1px] shadow-lg"
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
  );
}
