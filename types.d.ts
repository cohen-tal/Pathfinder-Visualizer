import Graph from "@/classes/graph";
import Node from "@/classes/node";

export type AlgorithmFunction = (
  graph: Graph
) => [visited: Set<Node>, path: Node[]];

export type MazeFunction = (graph: Graph) => Set<Node>;
