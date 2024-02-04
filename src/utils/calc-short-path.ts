import Node from "@/classes/node";

export default function shortestPath(startNode: Node, endNode: Node): Node[] {
  const shortestPath: Node[] = [];
  let currentNode = endNode;

  if (endNode.parent) {
    
    while (currentNode !== startNode) {
      shortestPath.push(currentNode);
      currentNode = currentNode.parent!;
    }

    shortestPath.push(startNode);
    shortestPath.reverse();
  }

  return shortestPath;
}
