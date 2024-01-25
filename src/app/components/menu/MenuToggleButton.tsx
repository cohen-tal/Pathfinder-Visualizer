import { useState } from "react";
import { motion } from "framer-motion";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export interface MenuToggleButtonProps {
  buttonText?: string | "Menu Button";
  chosenItem?: string;
  compRef?: React.RefObject<HTMLDivElement>;
  onClick?: () => void;
}

export default function MenuToggleButton({
  buttonText = "Menu Button",
  onClick,
  chosenItem,
  compRef,
}: MenuToggleButtonProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <motion.div
      className={
        chosenItem
          ? "flex flex-row items-center font-semibold hover:cursor-pointer hover:text-sky-500 border-sky-600/30 dark:border-slate-300 p-1 border-[1px] rounded-[4px] "
          : "flex flex-row items-center font-semibold hover:cursor-pointer hover:text-sky-500"
      }
      whileTap={{ scale: 0.8 }}
      onClick={() => {
        onClick?.();
        setIsOpen(!isOpen);
      }}
      ref={compRef}
    >
      {chosenItem ? chosenItem : buttonText}
      <motion.div animate={isOpen ? { rotate: 180 } : { rotate: 0 }}>
        <ArrowDropDownIcon />
      </motion.div>
    </motion.div>
  );
}
