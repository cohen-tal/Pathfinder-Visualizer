"use client";
import { useEffect, useState } from "react";
import NodeComponent from "./NodeComponent";
import Graph from "@/classes/graph";
import Node from "@/classes/node";
import styles from "./styles/page.module.css";

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
  const graphNodes: Node[][] = graph.nodes;
  const [nodes, setNodes] = useState<JSX.Element[]>([]);

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
          />
        );
      }
    }
    setNodes(nodeComponents);
  }, []);

  useEffect(() => {
    if (visitedNodes) {
      const visitedNodeElements = Array.from(visitedNodes).map((node) =>
        document.getElementById(`${node.pos[0]}-${node.pos[1]}`)
      );

      const visitedNodeAnimations = visitedNodeElements.map(
        (nodeElement, index) =>
          new Promise<void>((resolve) => {
            if (nodeElement) {
              setTimeout(() => {
                nodeElement.classList.add(styles.visited);
                resolve();
              }, 10 * index);
            }
          })
      );

      Promise.all(visitedNodeAnimations).then(() => {
        setTimeout(() => {
          if (shortestPath) {
            shortestPath.forEach((node, index) => {
              const nodeElement = document.getElementById(
                `${node.pos[0]}-${node.pos[1]}`
              );
              if (nodeElement) {
                setTimeout(() => {
                  nodeElement.classList.add(styles.shortestPath);
                }, 50 * index);
              }
            });
          }
        }, 1000); // 1000 milliseconds (1 second) delay
      });
    }
  }, [visitedNodes, shortestPath]);

  return <div className="grid grid-cols-[repeat(45,1fr)] gap-0]">{nodes}</div>;
}
