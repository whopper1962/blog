"use client";

import { useCallback } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type ThemeToggleProps = React.ComponentProps<typeof Button>;

export function ThemeToggle({ className = "", ...props }: ThemeToggleProps) {
  const { setTheme } = useTheme();

  const toggleTheme = useCallback(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "light" : "dark");
  }, [setTheme]);

  return (
    <Button
      type="button"
      size="icon"
      variant="transparent"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className={`w-8 h-full sm:w-12 sm:h-12 hover:bg-accent/80 transition-all duration-200 hover:scale-110 relative ${className}`}
      {...props}
    >
      <span className="sr-only">Toggle dark mode</span>
      <Image
        src="/lamp-off.png"
        alt="Lamp off icon"
        className="inline dark:hidden"
        width={0}
        height={0}
        sizes="100vw"
        priority
        style={{ width: "100%", height: "auto" }}
      />
      <Image
        src="/lamp-on.png"
        alt="Lamp on icon"
        className="hidden dark:inline"
        width={0}
        height={0}
        sizes="100vw"
        priority
        style={{ width: "100%", height: "auto" }}
      />
    </Button>
  );
}
