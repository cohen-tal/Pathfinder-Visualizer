import { useState } from "react";
import DropDownMenu, { DropDownMenuProps } from "../menu/DropDownMenu";
import MenuItem from "../menu/MenuItem";
import { MazeFunction } from "../../../../types";
import binaryTreeMaze from "@/utils/maze/binary-tree";
import randomizedPrim from "@/utils/maze/randomized-prim";
import randomWeights from "@/utils/maze/random-weights";

export default function MazeDropDownMenu({
  children,
  onMenuItemClicked,
}: DropDownMenuProps & {
  onMenuItemClicked: (algorithm: MazeFunction) => void;
}) {
  const [menuName, setMenuName] = useState<string>("Mazes");
  const [isItemClicked, setIsItemClicked] = useState<boolean>(false);

  const handleOnClick = (algoName: string, algoFunc: MazeFunction) => {
    setMenuName(algoName);
    setIsItemClicked(true);
    onMenuItemClicked(algoFunc);
  };

  return (
    <DropDownMenu menuName={menuName} isItemClicked={isItemClicked}>
      <MenuItem
        onClick={() => {
          handleOnClick("Binary-Tree", binaryTreeMaze);
        }}
      >
        Binary-Tree Algorithm
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleOnClick("Randomized Prim", randomizedPrim);
        }}
      >
        Randomized Prim Algorithm
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleOnClick("Random Weights", randomWeights);
        }}
      >
        Random Weights
      </MenuItem>
    </DropDownMenu>
  );
}
