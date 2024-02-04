import Node from "@/classes/node";

export default class PriorityQueue {
  values: [number, Node][] = [];

  enqueue(val: Node, priority: number): void {
    this.values.push([priority, val]);
    this.sort();
  }

  dequeue(): [number, Node] | undefined {
    return this.values.shift();
  }

  has(val: Node): boolean {
    return this.values.some((v) => v[1] === val);
  }

  changePriority(val: Node, priority: number): void {
    const index = this.values.findIndex((v) => v[1] === val);
    this.values[index][0] = priority;
    this.sort();
  }

  isEmpty() : boolean {
    return this.values.length === 0;
  }

  sort(): void {
    this.values.sort((a, b) => a[0] - b[0]);
  }
}
