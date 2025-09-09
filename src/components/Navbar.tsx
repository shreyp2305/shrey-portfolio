"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import AIChatButton from "./AIChatButton";
import { Menu, X } from "lucide-react";
import { useState } from "react";

// Extract links outside the component
const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        {/* Left side: logo + menu */}
        <div className="flex items-center gap-4">
          {/* Hamburger for mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden"
            aria-label="Toggle Menu"
          >
            <div className="relative h-7 w-7">
              <Menu
                size={28}
                className={`absolute transition-all duration-300 ${
                  menuOpen
                    ? "rotate-90 scale-0 opacity-0"
                    : "rotate-0 scale-100 opacity-100"
                }`}
              />
              <X
                size={28}
                className={`absolute transition-all duration-300 ${
                  menuOpen
                    ? "rotate-0 scale-100 opacity-100"
                    : "-rotate-90 scale-0 opacity-0"
                }`}
              />
            </div>
          </button>

          {/* Desktop links */}
          <nav className="hidden items-center gap-8 text-lg font-semibold sm:flex">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="relative px-2 py-1 transition-all duration-200 before:absolute
                  before:bottom-0 before:left-0 before:h-0.5 before:w-0 before:bg-primary before:transition-all before:duration-200 hover:text-primary
                  hover:before:w-full"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-6">
          <AIChatButton />
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="space-y-4 border-t border-border bg-background px-6 py-4 text-lg font-semibold sm:hidden">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="block transition-colors hover:text-primary"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
