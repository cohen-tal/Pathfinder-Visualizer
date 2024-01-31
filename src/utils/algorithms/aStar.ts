import Graph from "@/classes/graph";
import Node from "@/classes/node";
import PriorityQueue from "@/data-structures/PriorityQueue";
import shortestPath from "../calc-short-path";

export default function AStar(graph: Graph): [visited: Set<Node>, path: Node[]] {
    const visited = new Set<Node>();
    const priorityQueue = new PriorityQueue();
    const cameFrom = new Map<Node, Node>();
    const gScore = new Map<Node, number>();
    const fScore = new Map<Node, number>();
    const startNode = graph.getStartNode();
    const endNode = graph.getEndNode();

    initScoreMaps(graph, gScore, fScore);

    priorityQueue.enqueue(startNode, 0);
    gScore.set(startNode, 0);


    while(!priorityQueue.isEmpty()) {
        const current: Node = priorityQueue.dequeue()![1];
        

        // if (current === endNode) {
        //     const path = reconstructPath(cameFrom, current);
        //     return [visited, path];
        // }

        if(!current.wall) {
            visited.add(current);
            current.neighbors.forEach((neighbor) => {
                const tentativeGScore = gScore.get(current)! + neighbor.weight;
                if (tentativeGScore < gScore.get(neighbor)!) {
                    cameFrom.set(neighbor, current);
                    gScore.set(neighbor, tentativeGScore);
                    fScore.set(neighbor, tentativeGScore + distanceTo(neighbor, endNode));
                    if(!priorityQueue.has(neighbor)) {
                        priorityQueue.enqueue(neighbor, fScore.get(neighbor)!);
                    } else {
                        priorityQueue.changePriority(neighbor, fScore.get(neighbor)!);
                    }
                    neighbor.parent = current;
                }
            });
        }
    }

    const path = shortestPath(startNode, endNode);

    return [visited, path];
}

function reconstructPath(cameFrom: Map<Node, Node>, current: Node): Node[] {
    const totalPath: Node[] = [current];
    while (cameFrom.has(current)) {
        current = cameFrom.get(current)!;
        totalPath.push(current);
    }
    return totalPath;
}

function initScoreMaps(graph: Graph, gScore: Map<Node, number>, fScore: Map<Node, number>) {
    const nodes: Node[] = graph.nodes.flat();
    nodes.forEach((node) => {
        gScore.set(node, Infinity);
        fScore.set(node, Infinity);
    });
}

function distanceTo(node: Node, endNode: Node): number {
    const [x1,x2] = node.pos;
    const [y1,y2] = endNode.pos;
    const manhattanDistance = Math.abs(x1 - x2) + Math.abs(y1 - y2);
    return manhattanDistance;
}