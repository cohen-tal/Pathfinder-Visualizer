"use client";
import { useState } from "react";
import styles from "./styles/page.module.css";
import PlaceIcon from "@mui/icons-material/Place";
import TourIcon from "@mui/icons-material/Tour";

export interface NodeProps {
  id: [number, number];
  weight: number;
  isVisited: boolean;
  isStartNode: boolean;
  isEndNode: boolean;
  isWall: boolean;
}

export default function NodeComponent(props: NodeProps) {
  const [visited, setVisited] = useState<boolean>(props.isVisited);

  return (
    <svg
      className={props.isVisited ? styles.nodeVisited : ""}
      id={`${props.id[0]}-${props.id[1]}`}
      width="24"
      height="24"
    >
      <rect
        x="0"
        y="0"
        rx="3"
        ry="3"
        width="24"
        height="24"
        style={{
          fill: "transparent",
          stroke: "rgb(69, 160, 178)",
          strokeWidth: 1,
          opacity: 0.5,
        }}
      />
      {props.isStartNode ? (
        <PlaceIcon
          style={{
            color: "green",
          }}
        />
      ) : (
        ""
      )}
      {props.isEndNode ? (
        <TourIcon
          style={{
            color: "red",
          }}
        />
      ) : (
        ""
      )}
    </svg>
  );
}
