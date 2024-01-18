import Node from "../classes/node";

export default function bfs(startNode: Node, endNode: Node): Set<Node> {
  const visited: Set<Node> = new Set();
  const queue: Node[] = [];

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
        queue.push(neighbor);
      }
    }
  }

  return visited;
}
