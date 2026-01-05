/* Toggle UI theme between light and dark */
import React from "react";
import { Moon, Sun } from "lucide-react";
import { useApp } from "../state/AppContext.jsx";

export default function DarkModeToggle() {
  const { theme, setTheme } = useApp();
  return (
    <button 
      className="btn theme-toggle" 
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
