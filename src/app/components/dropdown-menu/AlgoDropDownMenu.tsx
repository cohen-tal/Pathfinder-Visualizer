import { useState } from "react";
import { ClickAwayListener } from "@mui/material";
import DropDownMenu, { DropDownMenuProps } from "../menu/DropDownMenu";
import MenuItem from "../menu/MenuItem";
import { AlgorithmFunction } from "../../../../types";
import bfs from "@/utils/algorithms/bfs";
import dijkstra from "@/utils/algorithms/dijkstra";
import AStar from "@/utils/algorithms/aStar";
import dfs from "@/utils/algorithms/dfs";
import bidirectionalAStar from "@/utils/algorithms/bidirectionalAStar";

export default function AlgoDropDownMenu({
  children,
  onMenuItemClicked,
}: DropDownMenuProps & {
  onMenuItemClicked: (algorithm: AlgorithmFunction) => void;
}) {
  const [isItemClicked, setIsItemClicked] = useState<boolean>(false);
  const [menuName, setMenuName] = useState<string>("Algorithms");

  const handleOnClick = (algoName: string, algoFunc: AlgorithmFunction) => {
    setMenuName(algoName);
    setIsItemClicked(true);
    onMenuItemClicked(algoFunc);
  };

  return (
    <DropDownMenu menuName={menuName} isItemClicked={isItemClicked}>
      <MenuItem
        onClick={() => {
          handleOnClick("Dijkstra's Algorithm", dijkstra);
        }}
      >
        {"Dijkstra's Algorithm"}
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleOnClick("A* (A-Star) Algorithm", AStar);
        }}
      >
        A* (A-Star) Algorithm
      </MenuItem>
      <MenuItem
        onClick={() =>
          handleOnClick("Bi-Directional A* (A-Star)", bidirectionalAStar)
        }
      >
        Bi-Directional A* (A-Star)
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleOnClick("Breadth-First Search (BFS)", bfs);
        }}
      >
        Breadth-First Search (BFS)
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleOnClick("Depth-First Search (DFS)", dfs);
        }}
      >
        Depth-First Search (DFS)
      </MenuItem>
    </DropDownMenu>
  );
}
