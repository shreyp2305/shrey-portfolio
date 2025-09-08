import { H1 } from "@/components/ui/H1";
import { H2 } from "@/components/ui/H2";
import { PROJECTS } from "@/data/portfolioConfig";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Projects",
  description: "Learn more about my personal projects.",
};

export default function Projects() {
  return (
    <main className="mx-auto max-w-4xl p-6">
      <H1 className="mb-4">Projects</H1>
      <p className="mb-8 text-muted-foreground">
        A collection of things I’ve built. Each project reflects my interests
        and skills.
      </p>
      <div className="grid gap-6 sm:grid-cols-2">
        {PROJECTS.map((project, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-border bg-card p-4 shadow-sm"
          >
            <H2 className="text-xl font-semibold text-card-foreground">
              {project.title}
            </H2>
            <p className="mt-2 text-sm text-card-foreground">
              {project.description}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Tools: {project.tools.join(", ")}
            </p>
            {project.link && (
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block font-medium text-primary hover:underline"
              >
                View Project →
              </Link>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
