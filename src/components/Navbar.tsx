import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import AIChatButton from "./AIChatButton";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        {/* Left side nav links */}
        <nav className="flex items-center gap-8 text-lg font-semibold">
          <Link href="/" className="transition-colors hover:text-primary">
            Home
          </Link>
          <Link
            href="/projects"
            className="transition-colors hover:text-primary"
          >
            Projects
          </Link>
          <Link
            href="/experience"
            className="transition-colors hover:text-primary"
          >
            Experience
          </Link>
          <Link
            href="/contact"
            className="transition-colors hover:text-primary"
          >
            Contact
          </Link>
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-6">
          <AIChatButton />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
