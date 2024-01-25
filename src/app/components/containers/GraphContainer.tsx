"use client";
import { useState, useMemo } from "react";
import GraphControls from "../topbar/TopBar";
import GraphComponent from "../graph/GraphComponent";
import bfs from "@/utils/bfs";
import Graph from "@/classes/graph";
import Node from "@/classes/node";
import BurgerMenu from "../menu/DropDownMenu";

export default function GraphContainer() {
  const graph: Graph = useMemo(() => new Graph(20, 45), []);
  const [visitedNodes, setVisitedNodes] = useState<Set<Node>>();
  const [shortestPath, setShortestPath] = useState<Node[]>([]);

  const calculatePath = (algorithmToUse: string) => {
    console.log(algorithmToUse);
    switch (algorithmToUse) {
      case "BFS": {
        const bfsResult: Set<Node> = bfs(graph);
        setVisitedNodes(bfsResult);
        break;
      }
      default: {
        break;
      }
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full gap-8">
        <GraphControls alogrithm={calculatePath} />
        <div className="flex flex-row items-start justify-center">
          <div className="bg-slate-50/25 border-slate-900/10 dark:border-slate-300/10 rounded-[7px] border-[1px] shadow-lg p-1">
            <GraphComponent graph={graph} />
          </div>
        </div>
      </div>
    </>
  );
}
