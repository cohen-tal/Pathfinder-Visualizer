"use client";
import { useState } from "react";
import styles from "./styles/page.module.css";
import { debounce } from "lodash";

export interface NodeProps {
  id: [number, number];
  weight: number;
  isVisited: boolean;
  isStartNode: boolean;
  isEndNode: boolean;
  isWall: boolean;
  changeWall: (id: [number, number], wall: boolean) => void;
  changeWeight: (id: [number, number], weight: number) => void;
}

export default function NodeComponent({
  id,
  weight,
  isEndNode,
  isStartNode,
  isVisited,
  isWall,
  changeWall,
  changeWeight,
}: NodeProps) {
  const [wall, setWall] = useState<boolean>(isWall);
  const [weightNode, setWeightNode] = useState<number>(weight);

  const handleWeightChange = (weight: number) => {
    setWeightNode(weight);
    changeWeight(id, weight);
    };
  
  return (
    <svg
      className={
        isVisited
          ? styles.visited
          : wall
          ? styles.wall
          : weightNode > 1
          ? styles.weight
          : ""
      }
      id={`${id[0]}-${id[1]}`}
      width="20"
      height="20"
      onClick={() => {
        setWall((prev) => !prev);
        changeWall(id, !wall);
      }}
      onMouseEnter={debounce((e) => {
        e.preventDefault();
        if (e.buttons === 1) {
          setWall((prev) => !prev);
          changeWall(id, !wall);
        } else if (e.buttons === 2) {
          weightNode === 1 ? handleWeightChange(5) : handleWeightChange(1);
        }
      }, 100)}
      onContextMenu={(e) => {
        e.preventDefault();
        weightNode === 1 ? handleWeightChange(5) : handleWeightChange(1);
      }}
    >
      <rect
        x="0"
        y="0"
        rx="5"
        ry="5"
        width="20"
        height="20"
        className="stroke-current text-blue-500 dark:text-white"
        style={{
          fill: isStartNode
            ? "#049307"
            : isEndNode
            ? "#d509f0"
            : weightNode > 1
            ? "#f59e0b"
            : "transparent",
          strokeWidth: 1,
          opacity: 0.2,
        }}
      />
      {isStartNode && <image href="/start-here.svg" height={20} width={20} />}
      {isEndNode && <image href="/marker-pin.svg" height={20} width={20} />}
      {weightNode > 1 && <image href="/weight.svg" height={20} width={20} />}
    </svg>
  );
}
