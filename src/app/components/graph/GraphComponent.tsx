"use client";
import { useEffect, useState } from "react";
import NodeComponent from "./NodeComponent";
import Graph from "@/classes/graph";
import Node from "@/classes/node";
import bfs from "@/utils/bfs";
import styles from "./styles/page.module.css";

export interface GraphProps {
  traversalAlgorithm: string;
  startNode: number;
  endNode: number;
}

export default function GraphComponent(props: GraphProps) {
  const graph: Graph = new Graph(23, 50);
  const graphNodes: Node[][] = graph.nodes;
  const [visitedNodes, setVisitedNodes] = useState<Node[]>([]);
  const [nodes, setNodes] = useState<JSX.Element[]>([]);

  //todo: change useEffect to useMemo to prevent rerendering
  useEffect(() => {
    const graphNodes2: JSX.Element[] = [];
    for (let i = 0; i < graphNodes.length; i++) {
      for (let j = 0; j < graphNodes[i].length; j++) {
        const node: Node = graphNodes[i][j];
        if (i === 9 && j === 14) {
          node.start = true;
        }
        if (i === 9 && j === 35) {
          node.end = true;
        }
        graphNodes2.push(
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
    setNodes(graphNodes2);
  }, []);

  useEffect(() => {
    let delay: number = 0;
    visitedNodes.forEach((node: Node) => {
      const nodeElement: HTMLElement | null = document.getElementById(
        `${node.pos[0]}-${node.pos[1]}`
      );
      if (nodeElement) {
        setTimeout(() => {
          nodeElement.classList.add(styles.nodeVisited);
        }, 100 * delay++);
      }
    });
  }, [visitedNodes]);

  return (
    <>
      <div className="grid grid-cols-[repeat(50,1fr)] grid-rows-[repeat(23,1fr)] gap-0]">
        {nodes}
      </div>
      <button
        type="button"
        className=" bg-orange-300 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          const visitedNodes2: Set<Node> = bfs(
            graphNodes[9][14],
            graphNodes[9][35]
          );
          const arrVisitedNodes: Node[] = [];
          visitedNodes2.forEach((node: Node) => {
            arrVisitedNodes.push(node);
          });
          setVisitedNodes(arrVisitedNodes);
        }}
      >
        Start Algorithm
      </button>
    </>
  );
}
