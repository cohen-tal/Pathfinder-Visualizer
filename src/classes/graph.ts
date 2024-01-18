import Node from "./node";

export default class Graph {
  nodes: Node[][] = [];

  constructor(rows: number, columns: number) {
    this.initializeGrid(rows, columns);
  }

  addNode(node: Node): void {
    const [row, column]: [number, number] = node.pos;
    this.nodes[row][column] = node;
  }

  addEdge(source: Node, destination: Node) {
    source.addNeighbor(destination);
  }

  initializeGrid(rows: number, columns: number) {
    for (let i = 0; i < rows; i++) {
      this.nodes.push([]);
      for (let j = 0; j < columns; j++) {
        const node = new Node([i, j], false, false, false, false, 0);
        this.addNode(node);
      }
    }
    console.log(this.nodes);

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

        if (row < rows - 1 && column < columns - 1) {
          const bottomRightNeighbor = this.nodes[row + 1][column + 1];
          this.addEdge(node, bottomRightNeighbor);
        }

        if (row < rows - 1 && column > 0) {
          const bottomLeftNeighbor = this.nodes[row + 1][column - 1];
          this.addEdge(node, bottomLeftNeighbor);
        }

        if (row > 0 && column < columns - 1) {
          const topRightNeighbor = this.nodes[row - 1][column + 1];
          this.addEdge(node, topRightNeighbor);
        }

        if (row > 0 && column > 0) {
          const topLeftNeighbor = this.nodes[row - 1][column - 1];
          this.addEdge(node, topLeftNeighbor);
        }
      }
    }
  }
}
