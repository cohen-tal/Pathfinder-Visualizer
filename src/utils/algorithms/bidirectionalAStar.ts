import Graph from "@/classes/graph";
import Node from "@/classes/node";
import PriorityQueue from "@/data-structures/PriorityQueue";

export default function bidirectionalAStar(graph: Graph): [visited: Set<Node>, path: Node[]] {
  const startVisited = new Set<Node>();
  const endVisited = new Set<Node>();
  
  const startPriorityQueue = new PriorityQueue();
  const endPriorityQueue = new PriorityQueue();

  const startCameFrom = new Map<Node, Node>();
  const endCameFrom = new Map<Node, Node>();

  const gScoreStart = new Map<Node, number>();
  const gScoreEnd = new Map<Node, number>();
  
  const fScoreStart = new Map<Node, number>();
  const fScoreEnd = new Map<Node, number>();

  const startNode = graph.getStartNode();
  const endNode = graph.getEndNode();

  initScoreMaps(graph, gScoreStart, fScoreStart);
  initScoreMaps(graph, gScoreEnd, fScoreEnd);

  startPriorityQueue.enqueue(startNode, 0);
  gScoreStart.set(startNode, 0);

  endPriorityQueue.enqueue(endNode, 0);
  gScoreEnd.set(endNode, 0);

  while (!startPriorityQueue.isEmpty() && !endPriorityQueue.isEmpty()) {
    const currentStart: Node = startPriorityQueue.dequeue()![1];
    const currentEnd: Node = endPriorityQueue.dequeue()![1];

    if (endVisited.has(currentStart) || startVisited.has(currentEnd)) {
      const intersectionNode = endVisited.has(currentStart) ? currentStart : currentEnd;
      const pathFromStart = reconstructPath(startCameFrom, intersectionNode).reverse();
      const pathFromEnd = reconstructPath(endCameFrom, intersectionNode).reverse();
      const visited = interleaveSets(startVisited, endVisited);
      return [visited, pathFromStart.concat(pathFromEnd)];
    }

    expandNode(currentStart, startVisited, startCameFrom, gScoreStart, fScoreStart, startPriorityQueue, endNode, graph);
    expandNode(currentEnd, endVisited, endCameFrom, gScoreEnd, fScoreEnd, endPriorityQueue, startNode, graph);
  }

  return [new Set<Node>(), []]; // No path found
}

function interleaveSets(set1: Set<Node>, set2: Set<Node>): Set<Node> {
  const interleavedSet = new Set<Node>();
  const set1Array = Array.from(set1);
  const set2Array = Array.from(set2);

  for (let i = 0; i < Math.max(set1Array.length, set2Array.length); i++) {
    if (set1Array[i]) interleavedSet.add(set1Array[i]);
    if (set2Array[i]) interleavedSet.add(set2Array[i]);
  }

  return interleavedSet;
}

function expandNode(
  current: Node,
  visited: Set<Node>,
  cameFrom: Map<Node, Node>,
  gScore: Map<Node, number>,
  fScore: Map<Node, number>,
  priorityQueue: PriorityQueue,
  targetNode: Node,
  graph: Graph
) {
  if (!current.wall && !visited.has(current)) {
    visited.add(current);

    current.neighbors.forEach((neighbor) => {
      const tentativeGScore = gScore.get(current)! + neighbor.weight;

      if (tentativeGScore < gScore.get(neighbor)!) {
        cameFrom.set(neighbor, current);
        gScore.set(neighbor, tentativeGScore);
        fScore.set(neighbor, tentativeGScore + distanceTo(neighbor, targetNode));

        if (!priorityQueue.has(neighbor)) {
          priorityQueue.enqueue(neighbor, fScore.get(neighbor)!);
        } else {
          priorityQueue.changePriority(neighbor, fScore.get(neighbor)!);
        }
      }
    });
  }
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
    const [x1,x2] = node.position;
    const [y1,y2] = endNode.position;
    const manhattanDistance = Math.abs(x1 - x2) + Math.abs(y1 - y2);
    return manhattanDistance;
}