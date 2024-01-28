export default class Node {
  pos: [number, number];
  weight: number;
  visited: boolean;
  start: boolean;
  end: boolean;
  wall: boolean;
  neighbors: Node[];
  parent: Node | null;
  distance: number;

  constructor(
    pos: [number, number],
    start: boolean,
    end: boolean,
    visited: boolean,
    wall: boolean,
    weight: number,
    parent: Node | null
  ) {
    this.pos = pos;
    this.weight = weight;
    this.start = start;
    this.end = end;
    this.visited = visited;
    this.wall = wall;
    this.neighbors = [];
    this.parent = parent;
    this.distance = 0;
  }

  addNeighbor(neighbor: Node) {
    this.neighbors.push(neighbor);
  }

  removeNeighbor(neighbor: Node) {
    this.neighbors.filter((node) => node !== neighbor);
  }

  toggleWall() {
    this.wall = !this.wall;
  }
}
