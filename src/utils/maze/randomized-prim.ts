import Graph from "@/classes/graph";
import Node from "@/classes/node";
import { animate } from "../animationUtils";
import styles from "@/app/components/graph/styles/page.module.css";

export default function randomizedPrim(graph: Graph): Set<Node> {
  const walls: Set<Node> = new Set<Node>();
  const rows: number = graph.nodes.length;
  const cols: number = graph.nodes[0].length;
  const wallList: Node[] = [];
  const visited: Set<Node> = new Set<Node>();

  graph.nodes.forEach((row, i) => {
    row.forEach((node, j) => {
      if (!node.start && !node.end) {
        node.wall = true;
        walls.add(node);
        // const element = document.getElementById(`${node.position[0]}-${node.position[1]}`);
        // if (element) {
        //     element.classList.add(styles.wallBg);
        // }
      }
    });
  });

  // animateVisited(walls, styles.wall);

  // graph.nodes.forEach((row, i) => {
  //     row.forEach((node, j) => {
  //         if (i === 0 || i === rows - 1 || j === 0 || j === cols - 1) {
  //             visited.add(node);
  //             wallList.push(...node.neighbors);
  //         }
  //     });
  // });

  const start: Node = graph.getEndNode();
  visited.add(start);
  wallList.push(...start.neighbors);

  while (wallList.length > 0) {
    const randomIndex: number = Math.floor(Math.random() * wallList.length);
    const randomWall: Node = wallList[randomIndex];
    wallList.splice(randomIndex, 1);
    const makePassage: boolean =
      randomWall.neighbors.filter((neighbor) => visited.has(neighbor))
        .length === 1;
    if (
      makePassage &&
      randomWall.position[0] !== 0 &&
      randomWall.position[0] !== rows - 1 &&
      randomWall.position[1] !== 0 &&
      randomWall.position[1] !== cols - 1
    ) {
      randomWall.wall = false;
      walls.delete(randomWall);
      visited.add(randomWall);
      wallList.push(
        ...randomWall.neighbors.filter((neighbor) => !visited.has(neighbor))
      );
    }
  }

  return walls;
}
