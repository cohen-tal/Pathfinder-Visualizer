import Graph from "@/classes/graph";
import Node from "@/classes/node";

export default function binaryTreeMaze(graph: Graph): Set<Node> {
  const walls: Set<Node> = new Set<Node>();
  const path: Node[] = [];
  const rows: number = graph.nodes.length;
  const cols: number = graph.nodes[0].length;
  const graphNodes: Node[] = graph.nodes.flat();

  graphNodes.forEach((node) => {
    if (!node.start && !node.end) {
      const x: number = node.position[0];
      const y: number = node.position[1];
      if (
        x % 2 === 0 ||
        y % 2 === 0 ||
        x === 0 ||
        x === rows - 1 ||
        y === 0 ||
        y === cols - 1
      ) {
        node.wall = true;
        walls.add(node);
      }
    }
  });

  for (let i = 1; i < rows - 2; i += 2) {
    for (let j = 1; j < cols - 1; j += 2) {
      const node = graph.nodes[i][j];
      const goRight = Math.random() > 0.5;
      if (goRight) {
        const rightNeighbor = graph.nodes[i][j + 1];
        rightNeighbor.wall = false;
        walls.delete(rightNeighbor);
      } else {
        const bottomNeighbor = graph.nodes[i + 1][j];
        bottomNeighbor.wall = false;
        walls.delete(bottomNeighbor);
      }
    }
  }

  for (let i = cols - 2; i > 0; i--) {
    path.push(graph.nodes[rows - 2][i]);
  }

  for (let i = cols - 2; i > 0; i--) {
    path.push(graph.nodes[1][i]);
  }

  path.forEach((node) => {
    walls.delete(node);
    node.wall = false;
  });

  return walls;
}
