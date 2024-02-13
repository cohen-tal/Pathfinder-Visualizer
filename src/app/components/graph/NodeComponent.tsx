import { useState, useEffect } from "react";
import styles from "./styles/page.module.css";

export interface NodeProps {
  id: [number, number];
  weight: number;
  isVisited?: boolean;
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
  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      const touch: Touch = e.touches[0];
      const element: Element | null = document.elementFromPoint(
        touch.clientX,
        touch.clientY
      );
      if (element) {
        const nodeId = element.getAttribute("id");
        if (nodeId) {
          const id: number[] = nodeId.split("-").map((node) => Number(node));
          changeWall([id[0], id[1]], !isWall);
        }
      }
    };

    document.addEventListener("touchmove", handleTouchMove);

    return () => {
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isWall, changeWall]);

  function handleWeightChange(newWeight: number) {
    changeWeight(id, newWeight);
  }

  return (
    <svg
      className={
        isVisited
          ? styles.visited
          : isWall
          ? styles.wall
          : weight > 1
          ? styles.weight
          : ""
      }
      id={`${id[0]}-${id[1]}`}
      width="20"
      height="20"
      onClick={() => {
        changeWall(id, !isWall);
      }}
      onMouseEnter={(e) => {
        e.preventDefault();
        if (e.buttons === 1) {
          changeWall(id, !isWall);
        } else if (e.buttons === 2) {
          weight === 1 ? handleWeightChange(5) : handleWeightChange(1);
        }
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        weight === 1 ? handleWeightChange(5) : handleWeightChange(1);
      }}
    >
      <rect
        id={`${id[0]}-${id[1]}`}
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
            : weight > 1
            ? "#f59e0be0"
            : "transparent",
          strokeWidth: 1,
          opacity: 0.3,
        }}
      />
      {isStartNode && <image href="/start-here.svg" height={20} width={20} />}
      {isEndNode && <image href="/marker-pin.svg" height={20} width={20} />}
      {weight > 1 && <image href="/weight.svg" height={20} width={20} />}
    </svg>
  );
}
