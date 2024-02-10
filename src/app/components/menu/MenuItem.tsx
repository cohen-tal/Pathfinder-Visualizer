import { ReactNode, useContext } from "react";
import { motion } from "framer-motion";
import { DropDownMenuContext } from "./DropDownMenu";

export interface MenuItemProps {
  children?: ReactNode;
  onClick?: () => void;
}

const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 20,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

export default function MenuItem({ children, onClick }: MenuItemProps) {
  const toggleMenu: () => void = useContext(DropDownMenuContext);
  const handleClick = () => {
    onClick?.();
    toggleMenu();
  };
  return (
    <motion.button
      variants={itemVariants}
      onClick={() => {
        handleClick();
      }}
    >
      <div className="font-semibold text-sm hover:bg-sky-600/50 dark:hover:text-white dark:hover:bg-sky-600/70 transition ease-in-out duration-500 rounded p-1">
        {children}
      </div>
    </motion.button>
  );
}
