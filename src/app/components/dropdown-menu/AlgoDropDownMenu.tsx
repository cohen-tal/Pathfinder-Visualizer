import { ClickAwayListener } from "@mui/material";
import DropDownMenu, { DropDownMenuProps } from "../menu/DropDownMenu";
import MenuItem from "../menu/MenuItem";

export default function AlgoDropDownMenu({
  menuName,
  children,
  onMenuItemClicked,
}: DropDownMenuProps & { onMenuItemClicked: (algo: string) => void }) {
  return (
    <DropDownMenu menuName="Algorithms">
      <MenuItem onClick={onMenuItemClicked}>{"Dijkstra's Algorithm"}</MenuItem>
      <MenuItem onClick={onMenuItemClicked}>A* (A-Star) Algorithm</MenuItem>
      <MenuItem onClick={onMenuItemClicked}>Bi-Directional A* (A-Star)</MenuItem>
      <MenuItem onClick={onMenuItemClicked}>Breadth-First Search (BFS)</MenuItem>
      <MenuItem onClick={onMenuItemClicked}>Depth-First Search (DFS)</MenuItem>
    </DropDownMenu>
  );
}
