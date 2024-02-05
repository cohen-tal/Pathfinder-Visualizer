import Node from "@/classes/node";

export function clearAllAnimations(...styles: string[]) {
  styles.forEach((style) => {
    const elements = document.querySelectorAll(`.${style}`);
    elements.forEach((element) => {
      element.classList.remove(style);
    });
  });
}

export function clearAnimations(nodes: Array<Node> | Set<Node>, ...styles: string[]) {
  nodes.forEach((node) => {
    const element = document.getElementById(
      `${node.position[0]}-${node.position[1]}`
    );
    if (element) {
      styles.forEach((style) => {
        element.classList.remove(style);
      });
      console.log(element.classList);
    }
  });
}

export function animateVisited(
  visited: Set<Node>,
  styles: string
): Promise<void>[] {
  const visitedNodeElements: (HTMLElement | null)[] = Array.from(visited).map(
    (node) => document.getElementById(`${node.position[0]}-${node.position[1]}`)
  );

  const visitedNodeAnimations: Promise<void>[] = visitedNodeElements.map(
    (nodeElement, index) =>
      new Promise<void>((resolve) => {
        if (nodeElement) {
          setTimeout(() => {
            nodeElement.classList.add(styles);
            resolve();
          }, 10 * index);
        }
      })
  );
  return visitedNodeAnimations;
}

export function animateShortestPath(path: Node[], styles: string) {
  const pathElements: (HTMLElement | null)[] = Array.from(path).map((node) =>
    document.getElementById(`${node.position[0]}-${node.position[1]}`)
  );

  pathElements.forEach((nodeElement, index) => {
    if (nodeElement) {
      setTimeout(() => {
        nodeElement.classList.add(styles);
      }, 50 * index);
    }
  });
}
