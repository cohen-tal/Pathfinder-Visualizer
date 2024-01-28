import Graph from "@/classes/graph";
import Node from "../../classes/node";
import shortestPath from "@/utils/calc-short-path";

export default function bfs(graph: Graph): [Set<Node>, Node[]] {
  const visited: Set<Node> = new Set();
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
      if (!visited.has(neighbor) && !neighbor.wall) {
        visited.add(neighbor);
        neighbor.visited = true;
        neighbor.parent = node;
        queue.push(neighbor);
      }
    }
  }

  return [visited, shortestPath(startNode, endNode)];
}
