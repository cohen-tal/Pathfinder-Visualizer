import { ClickAwayListener } from "@mui/material";
import DropDownMenu, { DropDownMenuProps } from "../menu/DropDownMenu";
import MenuItem from "../menu/MenuItem";

export default function AlgoDropDownMenu({
  menuName,
  children,
  onMenuItemClicked,
}: DropDownMenuProps & { onMenuItemClicked: (algo: string) => void }) {
  return (
    // <ClickAwayListener onClickAway={() => onMenuItemClicked("Visualize!")}>
    //   <div>
    <DropDownMenu menuName="Algorithms">
      <MenuItem onClick={onMenuItemClicked}>Breadth-First Search</MenuItem>
      <MenuItem onClick={onMenuItemClicked}>Depth-First Search</MenuItem>
    </DropDownMenu>
    //   </div>
    // </ClickAwayListener>
  );
}
