import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-border/50 bg-card/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-2 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Link
              href="/"
              className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent underline decoration-foreground/50 decoration-2 underline-offset-4"
            >
              Masashi Kawakami&apos;s Blog
            </Link>
          </div>

          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
