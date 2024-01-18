import { useState } from "react";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function DarkModeButton() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  return (
    <div>
      <button onClick={() => setDarkMode(!darkMode)}>Toggle Dark Mode</button>
      <LightModeIcon />
    </div>
  );
}
