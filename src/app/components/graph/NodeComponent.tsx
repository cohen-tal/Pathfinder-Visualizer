"use client";
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

export default function NodeComponent({ isVisited, ...props }: NodeProps) {
  // const [visited, setVisited] = useState<boolean>(isVisited);

  return (
    <svg
      className={isVisited ? styles.visited : ""}
      id={`${props.id[0]}-${props.id[1]}`}
      width="24"
      height="24"
    >
      <rect
        x="0"
        y="0"
        rx="7"
        ry="7"
        width="24"
        height="24"
        className="stroke-current text-blue-500 dark:text-white"
        style={{
          fill: "transparent",
          strokeWidth: 1,
          opacity: 0.2,
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
