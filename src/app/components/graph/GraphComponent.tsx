"use client";
import { useCallback, useEffect, useMemo } from "react";
import NodeComponent from "./NodeComponent";
import Graph from "@/classes/graph";
import Node from "@/classes/node";
import styles from "./styles/page.module.css";
import { animateShortestPath, animate } from "@/utils/animationUtils";

export interface GraphProps {
  graph: Graph;
  visitedNodes?: Set<Node>;
  shortestPath?: Node[];
}

export default function GraphComponent({
  graph,
  visitedNodes,
  shortestPath,
}: GraphProps) {
  
  const changeWall = useCallback((id: [number, number], wall: boolean) => {
    const [row, col] = id;
    graph.setWallNode(row, col, wall);
  }, [graph]);

  const changeWeight = useCallback((id: [number, number], weight: number) => {
    const [row, col] = id;
    graph.setWeightNode(row, col, weight);
  },[graph]);

  const memoizedNodes: JSX.Element[] = useMemo(() => {
    const nodeComponents: JSX.Element[] = [];
    const graphNodes: Node[][] = graph.nodes;
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
    return nodeComponents;
  }, [graph, changeWall, changeWeight]);

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

   return <div className={`grid grid-cols-[repeat(64,1fr)] grid-rows-[repeat(21 ,1fr)] hover:cursor-pointer`}>{memoizedNodes}</div>;
}
