import { motion } from "framer-motion";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";

interface RunAlgorithmButtonProps {
  onClick: () => void;
}

export default function RunAlgorithmButton({
  onClick,
}: RunAlgorithmButtonProps) {
  return (
    <motion.button
      className="font-semibold hover:text-white/90 dark:hover:text-sky-500 bg-sky-500/50 dark:bg-sky-500/50 border   rounded-md p-1"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => {
        onClick();
      }}
    >
      Start Visualization
      <PlayArrowRoundedIcon />
    </motion.button>
  );
}
