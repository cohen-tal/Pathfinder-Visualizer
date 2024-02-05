import React from "react";
import DropDownMenu, { DropDownMenuProps } from "../menu/DropDownMenu";
import MenuItem from "../menu/MenuItem";

export default function MazeDropDownMenu({
  menuName,
  children,
  onMenuItemClicked,
}: DropDownMenuProps & { onMenuItemClicked: (algo: string) => void }) {
  return (
    <DropDownMenu menuName={menuName}>
      <MenuItem onClick={onMenuItemClicked}>Binary-Tree Algorithm</MenuItem>
      <MenuItem onClick={onMenuItemClicked}>Randomized Prim Algorithm</MenuItem>
      <MenuItem onClick={onMenuItemClicked}>Maze3 Algo</MenuItem>
      <MenuItem onClick={onMenuItemClicked}>Maze4 Algo</MenuItem>
    </DropDownMenu>
  );
}
