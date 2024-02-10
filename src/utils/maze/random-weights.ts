import Graph from "@/classes/graph";
import Node from "@/classes/node";

export default function randomWeights(graph: Graph): Set<Node> {
  const weightNodes: Set<Node> = new Set();

  graph.nodes.flat().forEach((node) => {
    if (Math.random() <= 0.4 && !node.wall && !node.start && !node.end) {
      node.weight = 5;
      weightNodes.add(node);
    }
  });

  return weightNodes;
}
