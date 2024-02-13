"use client";
import { useState, useEffect } from "react";
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
import { useMediaQuery } from "@mui/material";

export default function GraphContainer() {
  const mobile = useMediaQuery("(max-width: 768px)");
  const [visitedNodes, setVisitedNodes] = useState<Set<Node>>();
  const [shortestPath, setShortestPath] = useState<Node[]>();
  const [graph, setGraph] = useState<Graph>(new Graph(21, 63));

  useEffect(() => {
    if (!mobile) {
      setGraph(new Graph(21, 63));
    } else {
      setGraph(new Graph(31, 17));
    }
  }, [mobile]);

  async function runAlgorithm(algorithm: AlgorithmFunction) {
    const newGraph: Graph = graph.clone();
    resetVisited(newGraph);
    const [visited, shortest]: [Set<Node>, Node[]] = algorithm(newGraph);
    const promises: Promise<void>[] = animate(visited, styles.visited);
    await Promise.all(promises).then(() => {
      animate(shortest, styles.shortestPath);
    });
  }

  async function generateMaze(mazeAlgorithm: MazeFunction) {
    const newGraph: Graph = graph.clone();
    resetVisited(newGraph);
    resetWalls(newGraph);
    resetWeights(newGraph);
    const walls: Set<Node> = mazeAlgorithm(newGraph);
    const promises: Promise<void>[] = animate(walls, styles.wallAnimated);
    await Promise.all(promises).then(() => {
      setGraph(newGraph);
    });
  }

  return (
    <div className="flex flex-col items-center justify-center w-full gap-4">
      <TopBar
        mobile={mobile}
        onAlgorithmClick={runAlgorithm}
        onMazeClick={generateMaze}
        resetAll={() => {
          const newGraph: Graph = graph.clone();
          resetAll(newGraph);
          setGraph(newGraph);
        }}
        resetWalls={() => {
          const newGraph: Graph = graph.clone();
          resetWalls(newGraph);
          setGraph(newGraph);
        }}
        resetWeights={() => {
          const newGraph: Graph = graph.clone();
          resetWeights(newGraph);
          setGraph(newGraph);
        }}
      />
      <Legend />
      <GraphComponent
        graphNodes={graph.nodes}
        visitedNodes={visitedNodes}
        shortestPath={shortestPath}
      />
    </div>
  );
}
