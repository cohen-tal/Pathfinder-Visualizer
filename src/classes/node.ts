export default class Node {
  pos: [number, number];
  weight: number;
  visited: boolean;
  start: boolean;
  end: boolean;
  wall: boolean;
  neighbors: Map<Node, number>;
  parent: Node | null = null;

  constructor(
    pos: [number, number],
    start: boolean,
    end: boolean,
    visited: boolean,
    wall: boolean,
    weight: number
  ) {
    this.pos = pos;
    this.weight = weight;
    this.start = start;
    this.end = end;
    this.visited = visited;
    this.wall = wall;
    this.neighbors = new Map();
  }

  addNeighbor(neighbor: Node) {
    this.neighbors.set(neighbor, neighbor.weight);
  }
}
