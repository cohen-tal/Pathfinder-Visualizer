import React from "react";
import { motion } from "framer-motion";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import Image from "next/image";

export default function Legend() {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="flex flex-row items-center justify-center gap-4">
        <div className="flex flex-row items-center gap-2 p-4">
          <motion.div className="w-8 h-8 bg-[#049307]/25 border border-slate-200/75 rounded-[7px] shadow-lg">
            <Image
              src="/start-here.svg"
              alt="start icon"
              width={32}
              height={32}
            />
          </motion.div>
          <p className="font-[Roboto] font-normal">Start Node</p>
        </div>
        <div className="flex flex-row items-center gap-2 p-4">
          <motion.div className="w-8 h-8 bg-[#d509f0]/25 border border-slate-200/75 rounded-[7px] shadow-lg">
            <Image
              src="/marker-pin.svg"
              alt="end icon"
              width={32}
              height={32}
            />
          </motion.div>
          <p className="font-[Roboto] font-normal">End Node</p>
        </div>
        <div className="flex flex-row items-center gap-2 p-4">
          <motion.div className="w-8 h-8 bg-[#f59e0b]/25 border border-slate-200/75 rounded-[7px] shadow-lg">
            <Image src="/weight.svg" alt="weight icon" width={32} height={32} />
          </motion.div>
          <p className="font-[Roboto] font-normal">Weighted Node</p>
        </div>
        <div className="flex flex-row items-center gap-2 p-4">
          <motion.div className="w-8 h-8 bg-[#3e3f3f] border border-slate-200/75 rounded-[7px] shadow-lg" />
          <p className="font-[Roboto] font-normal">Wall Node</p>
        </div>
        <div className="flex flex-row items-center gap-2 p-4">
          <motion.div className="w-8 h-8 bg-[#00bedabf] border border-slate-200/75 rounded-[7px] shadow-lg" />
          <p className="font-[Roboto] font-normal">Visited Node</p>
          </div>
        <div className="flex flex-row items-center gap-2 p-4">
          <motion.div className="w-8 h-8 bg-[#fc04c699] border border-slate-200/75 rounded-[7px] shadow-lg" />
          <p className="font-[Roboto] font-normal">Shortest Path Node</p>
      </div>
    </div>
    </div>
  );
}
