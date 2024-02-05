"use client";
import { useState, useMemo } from "react";
import GraphControls from "../topbar/TopBar";
import GraphComponent from "../graph/GraphComponent";
import bfs from "@/utils/algorithms/bfs";
import dijkstra from "@/utils/algorithms/dijkstra";
import Graph from "@/classes/graph";
import Node from "@/classes/node";
import styles from "@/app/components/graph/styles/page.module.css";
import {
  animate,
  clearAllAnimations,
  clearAnimations,
} from "@/utils/animationUtils";
import Legend from "../legend/Legend";
import AStar from "@/utils/algorithms/aStar";
import dfs from "@/utils/algorithms/dfs";
import bidirectionalAStar from "@/utils/algorithms/bidirectionalAStar";
import binaryTree from "@/utils/maze/binary-tree";
import randomizedPrim from "@/utils/maze/randomized-prim";

export default function GraphContainer() {
  const screenWidth: number = window.innerWidth;
  const rows = screenWidth < 1350 ? 17 : screenWidth < 1500 ? 21 : 23;
  const cols = screenWidth < 1350 ? 53 : screenWidth < 1500 ? 51 : 62;
  const graph: Graph = useMemo(() => new Graph(rows, cols), [rows, cols]);

  const [visitedNodes, setVisitedNodes] = useState<Set<Node>>();
  const [shortestPath, setShortestPath] = useState<Node[]>();

  const resetGraph = () => {
    graph.reset();
    clearAllAnimations(styles.visited, styles.shortestPath);
  };

  const resetWalls = () => {
    graph.resetWalls();
    clearAllAnimations(styles.maze, styles.wallBg, styles.wall);
  };

  const calculatePath = (algorithmToUse: string) => {
    resetGraph();
    //todo: change so that the button will return the fucntion of the algorithm to use
    switch (algorithmToUse) {
      case "Breadth-First Search (BFS)": {
        const [visited, shortest]: [Set<Node>, Node[]] = bfs(graph);
        setVisitedNodes(visited);
        setShortestPath(shortest);
        break;
      }
      case "Depth-First Search (DFS)": {
        const [visited, shortest]: [Set<Node>, Node[]] = dfs(graph);
        setVisitedNodes(visited);
        setShortestPath(shortest);
        break;
      }
      case "Dijkstra's Algorithm": {
        const [visited, shortest]: [Set<Node>, Node[]] = dijkstra(graph);
        setVisitedNodes(visited);
        setShortestPath(shortest);
        break;
      }
      case "A* (A-Star) Algorithm": {
        const [visited, shortest]: [Set<Node>, Node[]] = AStar(graph);
        setVisitedNodes(visited);
        setShortestPath(shortest);
        break;
      }
      case "Bi-Directional A* (A-Star)": {
        const [visited, shortest]: [Set<Node>, Node[]] =
          bidirectionalAStar(graph);
        setVisitedNodes(visited);
        setShortestPath(shortest);
        break;
      }
      default: {
        break;
      }
    }
  };

  const generateMaze = async (mazeToUse: string) => {
    resetGraph();
    resetWalls();
    switch (mazeToUse) {
      case "Binary-Tree Algorithm": {
        const walls = binaryTree(graph);
        animate(walls, styles.wall);
        break;
      }
      case "Randomized Prim Algorithm": {
        const maze: Set<Node> = randomizedPrim(graph);
        animate(maze, styles.wall);
        break;
      }
      // case "Maze3 Algo": {
      //   graph.maze3Algo();
      //   break;
      // }
      // case "Maze4 Algo": {
      //   graph.maze4Algo();
      //   break;
      // }
      default: {
        break;
      }
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full gap-4">
        <GraphControls alogrithm={calculatePath} maze={generateMaze} />
        <Legend />
        <div className="border-slate-900/10 dark:border-slate-300/10 rounded-[7px] border-[1px] shadow-lg">
          <GraphComponent
            graph={graph}
            visitedNodes={visitedNodes}
            shortestPath={shortestPath}
          />
        </div>
      </div>
    </>
  );
}
