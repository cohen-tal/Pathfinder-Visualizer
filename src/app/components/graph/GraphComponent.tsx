"use client";
import { useEffect, useState } from "react";
import NodeComponent from "./NodeComponent";
import Graph from "@/classes/graph";
import Node from "@/classes/node";
import styles from "./styles/page.module.css";
import { animateShortestPath, animate } from "@/utils/animationUtils";

export interface GraphProps {
  graph: Graph;
  rows?: number;
  cols?: number;
  visitedNodes?: Set<Node>;
  shortestPath?: Node[];
}

export default function GraphComponent({
  graph,
  rows = 21,
  cols = 51,
  visitedNodes,
  shortestPath,
}: GraphProps) {
  const graphNodes: Node[][] = graph.nodes;
  const [nodes, setNodes] = useState<JSX.Element[]>([]);

  const changeWall = (id: [number, number], wall: boolean) => {
    const [row, col] = id;
    graph.setWallNode(row, col, wall);
  };

  const changeWeight = (id: [number, number]) => {
    const [row, col] = id;
    graph.setWeightNode(row, col);
  };

  //todo: change useEffect to useMemo to prevent re-rendering
  useEffect(() => {
    const nodeComponents: JSX.Element[] = [];
    for (let i = 0; i < graphNodes.length; i++) {
      for (let j = 0; j < graphNodes[i].length; j++) {
        const node: Node = graphNodes[i][j];
        nodeComponents.push(
          <NodeComponent
            key={`${i}-${j}`}
            id={node.position}
            weight={node.weight}
            isVisited={node.visited}
            isStartNode={node.start}
            isEndNode={node.end}
            isWall={node.wall}
            changeWall={changeWall}
            changeWeight={changeWeight}
          />
        );
      }
    }
    setNodes(nodeComponents);
  }, []);

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

  return <div className={`${styles.grid} hover:cursor-pointer`}>{nodes}</div>;
}
