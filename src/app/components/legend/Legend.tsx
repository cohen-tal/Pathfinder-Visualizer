import React from "react";
import { motion } from "framer-motion";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import Image from "next/image";

export default function Legend() {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="flex flex-row items-center justify-center gap-4">
        <>
          <motion.div className="w-8 h-8 bg-[#049307]/25 rounded-[7px] shadow-lg">
            <Image
              src="/start-here.svg"
              alt="start icon"
              width={32}
              height={32}
            />
          </motion.div>
          <p>Start Node</p>
        </>
        <>
          <motion.div className="w-8 h-8 bg-[#d509f0]/25 border rounded-[7px] shadow-lg">
            <Image
              src="/marker-pin.svg"
              alt="end icon"
              width={32}
              height={32}
            />
          </motion.div>
          <p>End Node</p>
        </>
        <>
          <motion.div className="w-8 h-8 bg-[#f59e0b]/25 rounded-[7px] shadow-lg">
            <Image src="/weight.svg" alt="weight icon" width={32} height={32} />
          </motion.div>
          <p>Weighted Node</p>
        </>
      </div>
    </div>
  );
}
