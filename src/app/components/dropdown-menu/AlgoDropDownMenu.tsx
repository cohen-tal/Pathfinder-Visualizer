import { useState } from "react";
import { ClickAwayListener } from "@mui/material";
import DropDownMenu, { DropDownMenuProps } from "../menu/DropDownMenu";
import MenuItem from "../menu/MenuItem";

export default function AlgoDropDownMenu({
  menuName,
  children,
  onMenuItemClicked,
}: DropDownMenuProps & { onMenuItemClicked: (algo: string) => void }) {
  const [isItemClicked, setIsItemClicked] = useState<boolean>(false);
  const [menu, setMenu] = useState<string>("Algorithms");
  const handleOnClick = (algo: string) => {
    setIsItemClicked(true);
    setMenu(algo);
    onMenuItemClicked(algo);
  }
  return (
    <DropDownMenu menuName={menu} isItemClicked={isItemClicked}>
      <MenuItem onClick={handleOnClick}>{"Dijkstra's Algorithm"}</MenuItem>
      <MenuItem onClick={handleOnClick}>A* (A-Star) Algorithm</MenuItem>
      <MenuItem onClick={handleOnClick}>Bi-Directional A* (A-Star)</MenuItem>
      <MenuItem onClick={handleOnClick}>Breadth-First Search (BFS)</MenuItem>
      <MenuItem onClick={handleOnClick}>Depth-First Search (DFS)</MenuItem>
    </DropDownMenu>
  );
}
