import Graph from "@/classes/graph";
import Node from "@/classes/node";
import styles from "@/app/components/graph/styles/page.module.css";
import { animateSingle } from "../animationUtils";

export default function recursiveBackTracking(graph: Graph): Set<Node> {
  const walls: Set<Node> = new Set<Node>();
  const visited: Set<Node> = new Set<Node>();
  const [rows, cols]: [number, number] = [
    graph.nodes.length,
    graph.nodes[0].length,
  ];

  graph.nodes.forEach((row) => {
    row.forEach((node) => {
      if (
        !node.start &&
        !node.end &&
        (node.position[0] === 0 ||
          node.position[0] === rows - 1 ||
          node.position[1] === 0 ||
          node.position[1] === cols - 1)
      ) {
        node.wall = true;
        walls.add(node);
        visited.add(node);
      }
    });
  });

  graph.nodes.flat().forEach((node) => {
    if (!node.start && !node.end) {
      const x: number = node.position[0];
      const y: number = node.position[1];
      if (x % 2 === 0 || y % 2 === 0) {
        node.wall = true;
        walls.add(node);
      }
    }
  });

  generateMaze(graph, graph.nodes[2][2], visited, walls);

  //clear path for start and end nodes
  const [startRow, startCol] = graph.getStartNode().position;
  const [endRow, endCol] = graph.getEndNode().position;

  for (let i = 1; i < 3; i++) {
    const nodeStart: Node = graph.nodes[startRow + i][startCol];
    const nodeEnd: Node = graph.nodes[endRow - i - 1][endCol];
    nodeStart.wall = false;
    nodeEnd.wall = false;
    walls.delete(nodeStart);
    walls.delete(nodeEnd);
  }

  return walls;
}

function generateMaze(
  graph: Graph,
  currentNode: Node,
  visited: Set<Node> = new Set<Node>(),
  walls: Set<Node> = new Set<Node>()
): void {
  //Check if there are no new adjacent nodes to visit
  if (!hasCellsToVisit(graph, currentNode, visited)) {
    return;
  }

  visited.add(currentNode);
  const [row, col] = currentNode.position;
  const directions: string[] = ["up", "down", "left", "right"];

  while (directions.length > 0) {
    const randomIndex: number = Math.floor(Math.random() * directions.length);
    const direction: string = directions[randomIndex];
    directions.splice(randomIndex, 1);

    switch (direction) {
      case "up":
        if (row - 2 > 0 && !visited.has(graph.nodes[row - 2][col])) {
          const wallNode: Node = graph.nodes[row - 1][col];
          wallNode.wall = false;
          walls.delete(wallNode);
          generateMaze(graph, graph.nodes[row - 2][col], visited, walls);
        }
        break;
      case "down":
        if (
          row + 2 < graph.nodes.length - 1 &&
          !visited.has(graph.nodes[row + 2][col])
        ) {
          const wallNode: Node = graph.nodes[row + 1][col];
          wallNode.wall = false;
          walls.delete(wallNode);
          generateMaze(graph, graph.nodes[row + 2][col], visited, walls);
        }
        break;
      case "left":
        if (col - 2 > 0 && !visited.has(graph.nodes[row][col - 2])) {
          const wallNode: Node = graph.nodes[row][col - 1];
          wallNode.wall = false;
          walls.delete(wallNode);
          generateMaze(graph, graph.nodes[row][col - 2], visited, walls);
        }
        break;
      case "right":
        if (
          col + 2 < graph.nodes[0].length - 1 &&
          !visited.has(graph.nodes[row][col + 2])
        ) {
          const wallNode: Node = graph.nodes[row][col + 1];
          wallNode.wall = false;
          walls.delete(wallNode);
          generateMaze(graph, graph.nodes[row][col + 2], visited, walls);
        }
        break;
      default:
        break;
    }
  }
  return;
}

function hasCellsToVisit(graph: Graph, node: Node, visited: Set<Node>) {
  const [row, col] = node.position;
  return (
    !visited.has(graph.nodes[row][col - 2]) ||
    !visited.has(graph.nodes[row][col + 2]) ||
    !visited.has(graph.nodes[row - 2][col]) ||
    !visited.has(graph.nodes[row + 2][col])
  );
}
