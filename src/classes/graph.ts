import Node from "./node";

export default class Graph {
  nodes: Node[][] = [];

  constructor(rows: number, columns: number) {
    this.initializeGrid(rows, columns);
    const centerRow = Math.floor(rows / 2);
    const centerColumn = Math.floor(columns / 2);
    this.setStartNode(8, 8);
    this.setEndNode(rows - 3, columns - 3);
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
    return this.nodes[0][0];
  }

  getEndNode(): Node {
    for (const row of this.nodes) {
      for (const node of row) {
        if (node.end) {
          return node;
        }
      }
    }
    return this.nodes[this.nodes.length - 1][this.nodes[0].length - 1];
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

  clone(): Graph {
    const newGraph = new Graph(this.nodes.length, this.nodes[0].length);
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = 0; j < this.nodes[i].length; j++) {
        const oldNode = this.nodes[i][j];
        const newNode = newGraph.nodes[i][j];
        newNode.start = oldNode.start;
        newNode.end = oldNode.end;
        newNode.visited = oldNode.visited;
        newNode.parent = oldNode.parent;
        newNode.distance = oldNode.distance;
        newNode.wall = oldNode.wall;
        newNode.weight = oldNode.weight;
      }
    }
    return newGraph;
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
