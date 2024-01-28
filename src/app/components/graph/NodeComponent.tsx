"use client";
import { useState } from "react";
import styles from "./styles/page.module.css";
import PlaceIcon from "@mui/icons-material/Place";
import TourIcon from "@mui/icons-material/Tour";
import { debounce } from "lodash";

export interface NodeProps {
  id: [number, number];
  weight: number;
  isVisited: boolean;
  isStartNode: boolean;
  isEndNode: boolean;
  isWall: boolean;
  changeWall: (id: [number, number]) => void;
}

export default function NodeComponent({
  id,
  weight,
  isEndNode,
  isStartNode,
  isVisited,
  isWall,
  changeWall,
}: NodeProps) {
  const [wall, setWall] = useState<boolean>(isWall);
  return (
    <svg
      className={isVisited ? styles.visited : wall ? styles.wall : ""}
      id={`${id[0]}-${id[1]}`}
      width="24"
      height="24"
      onClick={() => {
        setWall(!wall);
        changeWall(id);
      }}
      onMouseEnter={debounce((e) => {
        e.preventDefault();
        if (e.buttons === 1) {
          setWall(!wall);
          changeWall(id);
        }
      }, 100)}
    >
      <rect
        x="0"
        y="0"
        rx="7"
        ry="7"
        width="24"
        height="24"
        className="stroke-current text-blue-500 dark:text-white"
        style={{
          fill: "transparent",
          strokeWidth: 1,
          opacity: 0.2,
        }}
      />
      {isStartNode ? <PlaceIcon /> : ""}
      {isEndNode ? <TourIcon /> : ""}
    </svg>
  );
}
