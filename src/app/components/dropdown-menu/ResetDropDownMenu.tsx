import { useState } from "react";
import { ClickAwayListener } from "@mui/material";
import DropDownMenu, { DropDownMenuProps } from "../menu/DropDownMenu";
import MenuItem from "../menu/MenuItem";

export default function ResetDropDownMenu({
  menuName,
  children,
  resetAll,
  resetWalls,
  resetWeights,
}: DropDownMenuProps & {
  resetAll: () => void;
  resetWalls: () => void;
  resetWeights: () => void;
}) {
  return (
    <DropDownMenu menuName={menuName}>
      <MenuItem onClick={resetAll}>Reset All</MenuItem>
      <MenuItem onClick={resetWalls}>Reset Walls</MenuItem>
      <MenuItem onClick={resetWeights}>Reset Weights</MenuItem>
    </DropDownMenu>
  );
}
