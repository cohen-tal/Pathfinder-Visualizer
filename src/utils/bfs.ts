import Graph from "@/classes/graph";
import Node from "../classes/node";

export default function bfs(graph: Graph): [Set<Node>, Node[]] {
  const visited: Set<Node> = new Set();
  const shortestPath: Node[] = [];
  const queue: Node[] = [];
  const startNode = graph.getStartNode();
  const endNode = graph.getEndNode();

  visited.add(startNode);
  queue.push(startNode);

  while (queue.length > 0) {
    const node = queue.shift()!;
    if (node === endNode) {
      break;
    }

    for (const neighbor of node.neighbors.keys()) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        neighbor.visited = true;
        neighbor.parent = node;
        queue.push(neighbor);
      }
    }
  }

  let currentNode = endNode;
  while (currentNode !== startNode) {
    shortestPath.push(currentNode);
    currentNode = currentNode.parent!;
  }
  shortestPath.push(startNode);

  return [visited, shortestPath];
}
