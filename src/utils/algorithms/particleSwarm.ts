import Graph from "@/classes/graph";
import Node from "@/classes/node";
import shortestPath from "../calc-short-path";

export default function particleSwarmAlgorithm(graph: Graph): [visited: Set<Node>, path: Node[]] {
    const startNode = graph.getStartNode();
    const endNode = graph.getEndNode();
    const nodes = graph.nodes.flat();
    const visitedNodes = new Set<Node>();

    nodes.forEach((node) => {
        node.distance = Infinity;
    });

    startNode.distance = 0;

    const queue = new Array<Node>();
    queue.push(startNode);

    while (queue.length > 0) {
        const currentNode: Node = queue.shift()!;

        if (visitedNodes.has(currentNode)) {
            continue;
        }

        visitedNodes.add(currentNode);

        if (currentNode === endNode) {
            break;
        }

        currentNode.neighbors.forEach((neighbor) => {
                if (!visitedNodes.has(neighbor) && !neighbor.wall) {
                    const newDistance = currentNode.distance + neighbor.weight;
                    if (newDistance < neighbor.distance) {
                        neighbor.distance = newDistance;
                        neighbor.parent = currentNode;
                        queue.push(neighbor);
                    }
            }
        });
    }    

    return [visitedNodes, shortestPath(startNode, endNode)];
}