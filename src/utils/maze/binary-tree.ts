import Graph from "@/classes/graph";
import Node from "@/classes/node";

export default function binaryTreeMaze(graph: Graph): Set<Node> {
    const walls: Set<Node> = new Set<Node>();
    const path: Node[] = [];
    const rows: number = graph.nodes.length;
    const cols: number = graph.nodes[0].length;
    const graphNodes: Node[] = graph.nodes.flat();

    graphNodes.forEach((node) => {
        if (!node.start && !node.end) {
            const x: number = node.position[0];
            const y: number = node.position[1];
            if(x % 2 === 0 || y % 2 === 0 || x === 0 || x === rows - 1 || y === 0 || y === cols - 1) {
                node.wall = true;
                walls.add(node);
            }
        }
    });

    //make a path from bottom left to top right of the maze and the path is either right or up
    for(let row = rows - 2; row > 0; row-=2) {
        for(let col = 1; col < cols - 1; col+=2) {
            const goRight = Math.random() > 0.5;
            if(row === 1) {
                path.push(graph.nodes[row][col + 1]);
            } else {
                goRight ? path.push(graph.nodes[row][col + 1]) : path.push(graph.nodes[row - 1][col]);
            }
        }
    }
    
    for (let i = cols - 2; i > 0; i--) {
        const node = graph.nodes[rows - 2][i];
        if (!path.includes(node)) {
            walls.delete(node);
            node.wall = false;
        }
    }

    path.forEach((node) => {
        walls.delete(node);
         node.wall = false;
        });

    return walls;
}
