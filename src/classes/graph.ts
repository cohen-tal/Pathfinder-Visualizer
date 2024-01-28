import Node from "./node";

export default class Graph {
  nodes: Node[][] = [];

  constructor(rows: number, columns: number) {
    this.initializeGrid(rows, columns);
    this.setStartNode(7, 10);
    this.setEndNode(7, 24);
  }

  addNode(node: Node): void {
    const [row, column]: [number, number] = node.pos;
    this.nodes[row][column] = node;
  }

  addEdge(source: Node, destination: Node) {
    source.addNeighbor(destination);
  }

  setStartNode(row: number, column: number) {
    this.nodes[row][column].start = true;
  }

  setEndNode(row: number, column: number) {
    this.nodes[row][column].end = true;
  }

  setWallNode(row: number, column: number) {
    this.nodes[row][column].toggleWall();
  }

  setVisitedNode(row: number, column: number) {
    this.nodes[row][column].visited = true;
  }

  getStartNode(): Node {
    for (const row of this.nodes) {
      for (const node of row) {
        if (node.start) {
          return node;
        }
      }
    }
    return this.nodes[10][15];
  }

  getEndNode(): Node {
    for (const row of this.nodes) {
      for (const node of row) {
        if (node.end) {
          return node;
        }
      }
    }
    return this.nodes[10][34];
  }

  initializeGrid(rows: number, columns: number) {
    for (let i = 0; i < rows; i++) {
      this.nodes.push([]);
      for (let j = 0; j < columns; j++) {
        const node = new Node([i, j], false, false, false, false, 1, null);
        this.addNode(node);
      }
    }

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        const node = this.nodes[i][j];
        const [row, column] = node.pos;

        if (row > 0) {
          const topNeighbor = this.nodes[row - 1][column];
          this.addEdge(node, topNeighbor);
        }

        if (row < rows - 1) {
          const bottomNeighbor = this.nodes[row + 1][column];
          this.addEdge(node, bottomNeighbor);
        }

        if (column > 0) {
          const leftNeighbor = this.nodes[row][column - 1];
          this.addEdge(node, leftNeighbor);
        }

        if (column < columns - 1) {
          const rightNeighbor = this.nodes[row][column + 1];
          this.addEdge(node, rightNeighbor);
        }
      }
    }
  }

  reset() {
    for (const row of this.nodes) {
      for (const node of row) {
        node.visited = false;
        node.parent = null;
        node.distance = 0;
      }
    }
  }
}
