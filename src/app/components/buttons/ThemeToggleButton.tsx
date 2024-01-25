import { useState } from "react";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import ModeNightOutlinedIcon from "@mui/icons-material/ModeNightOutlined";

export default function ThemeToggleButton() {
  const [alignment, setAlignment] = useState<string>(
    localStorage.getItem("theme") || "light"
  );

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  return (
    <Stack direction="row">
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
      >
        <ToggleButton
          value="light"
          aria-label="left aligned"
          className="hover:text-sky-600"
        >
          <LightModeOutlinedIcon />
        </ToggleButton>
        <ToggleButton value="dark" aria-label="right aligned">
          <ModeNightOutlinedIcon className="hover:fill-sky-600" />
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
}
