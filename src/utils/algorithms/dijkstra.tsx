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
    if (node !== startNode) {
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

    currentNode.neighbors.forEach((neighbor) => {
      const distance: number = currentNode.distance + neighbor.weight;
      // if (
      //   (neighbor.pos[0] === 9 || neighbor.pos[0] === 10) &&
      //   neighbor.pos[1] === 23
      // ) {
      //   console.log(neighbor.pos[0], neighbor.pos[1], neighbor.distance);

      //   console.log(neighbor.pos[0], neighbor.pos[1], distance);
      // }
      if (distance < neighbor.distance && !neighbor.wall) {
        if (
          (neighbor.pos[0] === 9 || neighbor.pos[0] === 10) &&
          neighbor.pos[1] === 23
        ) {
          console.log(
            `current: [${currentNode.pos[0]}, ${currentNode.pos[1]}], ${currentNode.distance}, parent: [${currentNode.parent?.pos[0]}, ${currentNode.parent?.pos[1]}]`
          );
          console.log(
            `new: [${neighbor.pos[0]}, ${neighbor.pos[1]}], ${distance}, parent: [${currentNode.pos[0]}, ${currentNode.pos[1]}]`
          );
        }
        neighbor.distance = distance;
        neighbor.parent = currentNode;
        queue.changePriority(neighbor, neighbor.distance);
      }
    });

    // currentNode.neighbors.forEach((weight, neighbor) => {
    //   const distance: number = currentNode.distance + weight;
    //   if (distance < neighbor.distance && !neighbor.wall) {
    //     neighbor.distance = distance;
    //     neighbor.parent = currentNode;
    //     queue.changePriority(neighbor, neighbor.distance);
    //   }
    // });

    visitedNodes.add(currentNode);
    currentNode.visited = true;
  }

  if (endNode.parent !== null) {
    visitedNodes.add(endNode);
  }

  theShortestPath = shortestPath(startNode, endNode);

  return [visitedNodes, theShortestPath];
}
