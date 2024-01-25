"use client";
import { useEffect, useState } from "react";
import NodeComponent from "./NodeComponent";
import Graph from "@/classes/graph";
import Node from "@/classes/node";
import bfs from "@/utils/bfs";
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
  // const [visitedNodes, setVisitedNodes] = useState<Node[]>([]);
  const [nodes, setNodes] = useState<JSX.Element[]>([]);

  //todo: change useEffect to useMemo to prevent rerendering
  useEffect(() => {
    const graphNodes2: JSX.Element[] = [];
    for (let i = 0; i < graphNodes.length; i++) {
      for (let j = 0; j < graphNodes[i].length; j++) {
        const node: Node = graphNodes[i][j];
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

  return <div className="grid grid-cols-[repeat(45,1fr)] gap-0]">{nodes}</div>;
}
