import {useState} from "react";
import DropDownMenu, { DropDownMenuProps } from "../menu/DropDownMenu";
import MenuItem from "../menu/MenuItem";

export default function MazeDropDownMenu({
  menuName,
  children,
  onMenuItemClicked,
}: DropDownMenuProps & { onMenuItemClicked: (algo: string) => void }) {
  const [menu, setMenu] = useState<string>("Mazes");
  const [isItemClicked, setIsItemClicked] = useState<boolean>(false);
  
  const handleOnClick = (algo: string) => {
    setIsItemClicked(true);
    setMenu(algo);
    onMenuItemClicked(algo);
  }

  return (
    <DropDownMenu menuName={menu} isItemClicked={isItemClicked}>
      <MenuItem onClick={handleOnClick}>Binary-Tree Algorithm</MenuItem>
      <MenuItem onClick={handleOnClick}>Randomized Prim Algorithm</MenuItem>
      <MenuItem onClick={handleOnClick}>Maze3 Algo</MenuItem>
      <MenuItem onClick={handleOnClick}>Maze4 Algo</MenuItem>
    </DropDownMenu>
  );
}
