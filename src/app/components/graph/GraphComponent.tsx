"use client";
import { useEffect, useState } from "react";
import NodeComponent from "./NodeComponent";
import Graph from "@/classes/graph";
import Node from "@/classes/node";
import styles from "./styles/page.module.css";
import { animateShortestPath, animateVisited } from "@/utils/animationUtils";

export interface GraphProps {
  graph: Graph;
  rows?: number;
  cols?: number;
  visitedNodes?: Set<Node>;
  shortestPath?: Node[];
}

export default function GraphComponent({
  graph,
  rows = 15,
  cols = 35,
  visitedNodes,
  shortestPath,
}: GraphProps) {
  const graphNodes: Node[][] = graph.nodes;
  const [nodes, setNodes] = useState<JSX.Element[]>([]);

  const changeWall = (id: [number, number]) => {
    const [row, col] = id;
    graph.setWallNode(row, col);
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
            id={node.pos}
            weight={node.weight}
            isVisited={node.visited}
            isStartNode={node.start}
            isEndNode={node.end}
            isWall={node.wall}
            changeWall={changeWall}
          />
        );
      }
    }
    setNodes(nodeComponents);
  }, []);

  useEffect(() => {
    if (visitedNodes) {
      const visitedNodeAnimations: Promise<void>[] = animateVisited(
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
      className={`grid grid-cols-[repeat(${cols},1fr)] grid-rows-[repeat(${rows},1fr)] gap-0 hover:cursor-pointer`}
    >
      {nodes}
    </div>
  );
}
