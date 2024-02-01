import Graph from "@/classes/graph";
import Node from "@/classes/node";
import shortestPath from "../calc-short-path";
import PriorityQueue from "@/data-structures/PriorityQueue";

export default function dijkstra(graph: Graph): [visited: Set<Node>, path: Node[]] {
    const startNode = graph.getStartNode();
    const endNode = graph.getEndNode();
    const nodes = graph.nodes.flat();
    const visitedNodes = new Set<Node>();

    nodes.forEach((node) => {
        node.distance = Infinity;
    });

    startNode.distance = 0;

    const queue: PriorityQueue = new PriorityQueue();
    queue.enqueue(startNode, 0);

    while (!queue.isEmpty()) {
        const currentNode: Node = queue.dequeue()![1];

        if (visitedNodes.has(currentNode)) {
            continue;
        }

        visitedNodes.add(currentNode);
        currentNode.visited = true;

        if (currentNode === endNode) {
            break;
        }

        currentNode.neighbors.forEach((neighbor) => {
                if (!visitedNodes.has(neighbor) && !neighbor.wall) {
                    const newDistance = currentNode.distance + neighbor.weight;
                    if (newDistance < neighbor.distance) {
                        neighbor.distance = newDistance;
                        neighbor.parent = currentNode;
                        queue.enqueue(neighbor, newDistance);
                    }
            }
        });
    }    

    return [visitedNodes, shortestPath(startNode, endNode)];
}