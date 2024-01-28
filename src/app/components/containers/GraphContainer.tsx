"use client";
import { useState, useMemo } from "react";
import GraphControls from "../topbar/TopBar";
import GraphComponent from "../graph/GraphComponent";
import bfs from "@/utils/algorithms/bfs";
import dijkstra from "@/utils/algorithms/dijkstra";
import Graph from "@/classes/graph";
import Node from "@/classes/node";
import styles from "@/app/components/graph/styles/page.module.css";
import { clearAnimations } from "@/utils/animationUtils";

export default function GraphContainer() {
  const graph: Graph = useMemo(() => new Graph(15, 35), []);
  const [visitedNodes, setVisitedNodes] = useState<Set<Node>>();
  const [shortestPath, setShortestPath] = useState<Node[]>();

  const resetGraph = () => {
    graph.reset();
    clearAnimations(styles.visited);
  };

  const calculatePath = (algorithmToUse: string) => {
    console.log(algorithmToUse);
    //todo: change so that the button will return the fucntion of the algorithm to use
    switch (algorithmToUse) {
      case "Breadth-First Search": {
        resetGraph();
        const [visited, shortest]: [Set<Node>, Node[]] = bfs(graph);
        setVisitedNodes(visited);
        setShortestPath(shortest);
        break;
      }
      case "Depth-First Search": {
        break;
      }
      case "Dijkstra's Algorithm": {
        resetGraph();
        const [visited, shortest]: [Set<Node>, Node[]] = dijkstra(graph);
        setVisitedNodes(visited);
        setShortestPath(shortest);
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
          <div className="border-slate-900/10 dark:border-slate-300/10 rounded-[7px] border-[1px] shadow-lg">
            <GraphComponent
              graph={graph}
              visitedNodes={visitedNodes}
              shortestPath={shortestPath}
            />
          </div>
        </div>
      </div>
    </>
  );
}
