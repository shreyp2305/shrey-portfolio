"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      <Sun
        size={24}
        className="absolute scale-0 rotate-90 cursor-pointer transition-all dark:scale-100 dark:rotate-0"
      />
      <Moon
        size={24}
        className="scale-100 rotate-0 cursor-pointer transition-all dark:scale-0 dark:-rotate-90"
      />
    </button>
  );
}
