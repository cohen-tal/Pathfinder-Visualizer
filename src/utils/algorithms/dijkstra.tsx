import Graph from "@/classes/graph";
import Node from "@/classes/node";
import PriorityQueue from "@/data-structures/PriorityQueue";
import shortestPath from "../calc-short-path";

export default function dijkstra(graph: Graph): [Set<Node>, Node[]] {
  const startNode: Node = graph.getStartNode();
  const endNode: Node = graph.getEndNode();
  let theShortestPath: Node[] = [];
  const visitedNodes: Set<Node> = new Set<Node>();
  const unvisitedNodes: Node[] = graph.nodes.flat();
  const queue: PriorityQueue = new PriorityQueue();

  // Initialize all nodes to have a distance of infinity and add them to the priority queue
  unvisitedNodes.forEach((node) => {
    if (node !== startNode && !node.wall) {
      node.distance = Number.POSITIVE_INFINITY;
      queue.enqueue(node, node.distance);
    } else {
      node.distance = 0;
      queue.enqueue(node, node.distance);
    }
  });

  console.log(queue);

  while (!queue.isEmpty()) {
    const currentNode: Node = queue.dequeue()![1]!;

    if (currentNode === endNode) {
      break;
    }

    currentNode.neighbors.forEach((weight, neighbor) => {
      const distance: number = currentNode.distance + weight;
      if (distance < neighbor.distance) {
        neighbor.distance = distance;
        neighbor.parent = currentNode;
        queue.changePriority(neighbor, neighbor.distance);
      }
    });

    visitedNodes.add(currentNode);
    currentNode.visited = true;
  }

  if (endNode.parent !== null) {
    visitedNodes.add(endNode);
  }

  theShortestPath = shortestPath(startNode, endNode);

  return [visitedNodes, theShortestPath];
}
