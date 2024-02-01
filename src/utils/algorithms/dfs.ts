import Graph from "@/classes/graph";
import Node from "@/classes/node";
import shortestPath from "../calc-short-path";

export default function dfs(graph:Graph):[visited: Set<Node>, path: Node[]] {
    const visited = new Set<Node>();
    const stack: Node[] = [];
    const startNode = graph.getStartNode();
    const endNode = graph.getEndNode();

    stack.push(startNode);

    while(stack.length > 0) { 
        const current = stack.pop()!;

        if(current === endNode) {
            const path = shortestPath(startNode, endNode);
            return [visited, path];
        }

        if(!current.wall) {
            visited.add(current);
            current.neighbors.forEach((neighbor) => {
                if(!visited.has(neighbor) && !neighbor.wall) {
                    stack.push(neighbor);
                    neighbor.parent = current;
                }
            });
        }
    }
    
    const path = shortestPath(startNode, endNode);

    return [visited, path];
}