import Node from "./node";

export default class Graph {
  nodes: Node[][] = [];

  constructor(rows: number, columns: number) {
    this.initializeGrid(rows, columns);
    const centerRow = Math.floor(rows / 2);
    const centerColumn = Math.floor(columns / 2);
    this.setStartNode(centerRow, centerColumn - 10);
    this.setEndNode(centerRow, centerColumn + 10);
  }

  addNode(node: Node): void {
    const [row, column]: [number, number] = node.position;
    this.nodes[row][column] = node;
  }

  addEdge(source: Node, destination: Node) {
    source.addNeighbor(destination);
  }

  setStartNode(row: number, column: number) {
    const node = this.nodes[row][column];
    node.start = true;
  }

  setEndNode(row: number, column: number) {
    const node = this.nodes[row][column];
    node.end = true;
  }

  setWallNode(row: number, column: number, wall: boolean) {
    const node = this.nodes[row][column];
    node.setWall(wall);
  }

  setVisitedNode(row: number, column: number) {
    const node = this.nodes[row][column];
    node.visited = true;
  }

  setWeightNode(row: number, column: number, weight: number) {
    const node = this.nodes[row][column];
    node.weight = weight;
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
        const [row, column] = node.position;

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

  resetAll() {
    for (const row of this.nodes) {
      for (const node of row) {
        node.visited = false;
        node.parent = null;
        node.distance = 0;
        node.wall = false;
        node.weight = 1;
      }
    }
  }

  resetVisited() {
    for (const row of this.nodes) {
      for (const node of row) {
        node.visited = false;
        node.parent = null;
        node.distance = 0;
      }
    }
  }

  resetWalls() {
    for (const row of this.nodes) {
      for (const node of row) {
        if (!node.start && !node.end) {
          node.wall = false;
        }
      }
    }
  }

  resetWeights() {
    for (const row of this.nodes) {
      for (const node of row) {
        if (!node.start && !node.end) {
          node.weight = 1;
        }
      }
    }
  }
}
