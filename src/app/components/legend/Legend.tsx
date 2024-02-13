import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Legend() {
  return (
    <div className="grid grid-cols-3 md:flex md:flex-row items-center justify-center">
      <div className="flex flex-row items-center gap-2 p-2 md:p-4">
        <motion.div className="w-8 h-8 bg-[#049307]/25 border border-slate-200/75 rounded-[7px] shadow-lg">
          <Image
            src="/start-here.svg"
            alt="start icon"
            width={32}
            height={32}
          />
        </motion.div>
        <p>Start Node</p>
      </div>
      <div className="flex flex-row items-center gap-2 p-2 md:p-4">
        <motion.div className="w-8 h-8 bg-[#d509f0]/25 border border-slate-200/75 rounded-[7px] shadow-lg">
          <Image src="/marker-pin.svg" alt="end icon" width={32} height={32} />
        </motion.div>
        <p>End Node</p>
      </div>
      <div className="flex flex-row items-center gap-2 md:pr-4 p-2 md:p-4">
        <motion.div className="w-8 h-8 bg-[#f59e0be0] border border-slate-200/75 rounded-[7px] shadow-lg">
          <Image src="/weight.svg" alt="weight icon" width={32} height={32} />
        </motion.div>
        <p>Weighted Node</p>
      </div>
      <div className="flex flex-row items-center gap-2 md:pr-4 p-2 md:p-4">
        <motion.div className="w-8 h-8 bg-[#3e3f3f] border border-slate-200/75 rounded-[7px] shadow-lg" />
        <p>Wall Node</p>
      </div>
      <div className="flex flex-row items-center gap-2 md:pr-4 p-2 md:p-4">
        <motion.div className="w-8 h-8 bg-[#00bedabf] border border-slate-200/75 rounded-[7px] shadow-lg" />
        <p>Visited Node</p>
      </div>
      <div className="flex flex-row items-center gap-2 md:pr-4 p-2 md:p-4">
        <motion.div className="w-8 h-8 bg-[#fc04c699] border border-slate-200/75 rounded-[7px] shadow-lg" />
        <p>Shortest Path</p>
      </div>
    </div>
  );
}
