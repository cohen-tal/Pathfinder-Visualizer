"use client";
import { useState } from "react";
import TopBar from "../topbar/TopBar";
import GraphComponent from "../graph/GraphComponent";
import Graph from "@/classes/graph";
import Node from "@/classes/node";
import styles from "@/app/components/graph/styles/page.module.css";
import { animate } from "@/utils/animationUtils";
import {
  resetAll,
  resetVisited,
  resetWalls,
  resetWeights,
} from "@/utils/resetGraphUtils";
import Legend from "../legend/Legend";
import { AlgorithmFunction, MazeFunction } from "../../../../types";

export default function GraphContainer() {
  const [visitedNodes, setVisitedNodes] = useState<Set<Node>>();
  const [shortestPath, setShortestPath] = useState<Node[]>();
  const [graph, setGraph] = useState<[Graph]>([new Graph(21, 64)]);

  function runAlgorithm(algorithm: AlgorithmFunction) {
    resetVisited(...graph);
    const [visited, shortest]: [Set<Node>, Node[]] = algorithm(...graph);
    setVisitedNodes(visited);
    setShortestPath(shortest);
  }

  function generateMaze(mazeAlgorithm: MazeFunction) {
    resetVisited(...graph);
    resetWalls(...graph);
    const walls: Set<Node> = mazeAlgorithm(...graph);
    const promises: Promise<void>[] = animate(walls, styles.wallAnimated);
    Promise.all(promises).then(() => {
      setGraph((prev) => [...prev]);
    });
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full gap-4">
        <TopBar
          onAlgorithmClick={runAlgorithm}
          onMazeClick={generateMaze}
          resetAll={() => {
            resetAll(...graph);
            setGraph((prev) => [...prev]);
          }}
          resetWalls={() => {
            resetWalls(...graph);
            setGraph((prev) => [...prev]);
          }}
          resetWeights={() => {
            resetWeights(...graph);
            setGraph((prev) => [...prev]);
          }}
        />
        <Legend />
        <div className="border-slate-900/10 dark:border-slate-300/10 rounded-[7px] border-[1px] shadow-lg">
          <GraphComponent
            graphNodes={graph[0].nodes}
            visitedNodes={visitedNodes}
            shortestPath={shortestPath}
          ></GraphComponent>
        </div>
      </div>
    </>
  );
}
