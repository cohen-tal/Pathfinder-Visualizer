import Graph from "@/classes/graph";
import styles from "@/app/components/graph/styles/page.module.css";
import { clearAllAnimations } from "@/utils/animationUtils";

export function resetAll(graph: Graph) {
  graph.resetAll();
  clearAllAnimations(
    styles.visited,
    styles.shortestPath,
    styles.maze,
    styles.wallBg,
    styles.wall,
    styles.weight
  );
}

export function resetVisited(graph: Graph) {
  graph.resetVisited();
  clearAllAnimations(styles.visited, styles.shortestPath);
}

export function resetWalls(graph: Graph) {
  graph.resetWalls();
  // clearAllAnimations(styles.maze, styles.wallBg, styles.wall);
}

export function resetWeights(graph: Graph) {
  graph.resetWeights();
  clearAllAnimations(styles.weight);
}
