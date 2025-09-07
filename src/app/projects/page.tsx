import { H1 } from "@/components/ui/H1";
import { PROJECTS } from "@/data/portfolioConfig";
import Link from "next/link";

export default function Projects() {
  return (
    <main className="mx-auto max-w-4xl p-6">
      <H1 className="mb-4">Projects</H1>
      <p className="mb-8 text-[var(--muted-foreground)]">
        A collection of things I’ve built. Each project reflects my interests
        and skills.
      </p>
      <div className="grid gap-6 sm:grid-cols-2">
        {PROJECTS.map((project, idx) => (
          <div
            key={idx}
            className="border-border bg-card rounded-2xl border p-4 shadow-sm"
          >
            <h2 className="text-xl font-semibold text-[var(--card-foreground)]">
              {project.title}
            </h2>
            <p className="mt-2 text-sm text-[var(--card-foreground)]">
              {project.description}
            </p>
            <p className="mt-1 text-xs text-[var(--muted-foreground)]">
              Tools: {project.tools.join(", ")}
            </p>
            {project.link && (
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block font-medium text-[var(--primary)] hover:underline"
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
