import Node from "@/classes/node";

export default class PriorityQueue {
  values: [number, Node][] = [];

  enqueue(val: Node, priority: number) {
    this.values.push([priority, val]);
    this.sort();
  }

  dequeue() {
    return this.values.shift();
  }

  changePriority(val: Node, priority: number) {
    const index = this.values.findIndex((v) => v[1] === val);
    this.values[index][0] = priority;
    this.sort();
  }

  isEmpty() {
    return this.values.length === 0;
  }

  sort() {
    this.values.sort((a, b) => a[0] - b[0]);
  }
}
