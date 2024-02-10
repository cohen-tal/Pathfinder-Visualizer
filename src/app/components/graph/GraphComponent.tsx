"use client";
import { useEffect, useState } from "react";
import NodeComponent from "./NodeComponent";
import Node from "@/classes/node";
import styles from "./styles/page.module.css";
import {
  animateShortestPath,
  animate,
  animateSingle,
} from "@/utils/animationUtils";

export interface GraphProps {
  graphNodes: Node[][];
  children?: React.ReactNode;
  visitedNodes?: Set<Node>;
  shortestPath?: Node[];
}

export default function GraphComponent({
  graphNodes,
  children,
  visitedNodes,
  shortestPath,
}: GraphProps) {
  const [nodes, setNodes] = useState<Node[][]>(graphNodes);

  function handleWeightChange(id: [number, number], weight: number) {
    setNodes((prev) => {
      const newGraphNodes: Node[][] = prev.map((row) => {
        return row.map((node) => {
          if (node.position[0] === id[0] && node.position[1] === id[1]) {
            node.weight = weight;
          }
          return node;
        });
      });
      return newGraphNodes;
    });
  }

  function handleWallChange(id: [number, number], wall: boolean) {
    setNodes((prev) => {
      const newGraphNodes: Node[][] = prev.map((row) => {
        return row.map((node) => {
          if (node.position[0] === id[0] && node.position[1] === id[1]) {
            node.wall = wall;
          }
          return node;
        });
      });
      return newGraphNodes;
    });
  }

  useEffect(() => {
    if (visitedNodes) {
      const visitedNodeAnimations: Promise<void>[] = animate(
        visitedNodes,
        styles.visited
      );

      Promise.all(visitedNodeAnimations).then(() => {
        setTimeout(() => {
          if (shortestPath) {
            animateShortestPath(shortestPath, styles.shortestPath);
          }
        }, 1000);
      });
    }
  }, [visitedNodes, shortestPath]);

  return (
    <div
      className={`grid grid-cols-[repeat(64,1fr)] grid-rows-[repeat(21 ,1fr)] hover:cursor-pointer`}
    >
      {nodes.map((row) => {
        return row.map((node) => {
          return (
            <NodeComponent
              key={`${node.position[0]}-${node.position[1]}`}
              id={node.position}
              weight={node.weight}
              isStartNode={node.start}
              isEndNode={node.end}
              isWall={node.wall}
              changeWall={(id: [number, number], wall: boolean) => {
                handleWallChange(id, wall);
              }}
              changeWeight={(id: [number, number], weight: number) => {
                handleWeightChange(id, weight);
              }}
            />
          );
        });
      })}
    </div>
  );
}
