import { H1 } from "@/components/ui/H1";
import { H2 } from "@/components/ui/H2";
import { PROJECTS } from "@/data/portfolioConfig";
import Link from "next/link";

export default function Projects() {
  return (
    <main className="mx-auto max-w-4xl p-6">
      <H1 className="mb-4">Projects</H1>
      <p className="text-muted-foreground mb-8">
        A collection of things I’ve built. Each project reflects my interests
        and skills.
      </p>
      <div className="grid gap-6 sm:grid-cols-2">
        {PROJECTS.map((project, idx) => (
          <div
            key={idx}
            className="border-border bg-card rounded-2xl border p-4 shadow-sm"
          >
            <H2 className="text-card-foreground text-xl font-semibold">
              {project.title}
            </H2>
            <p className="text-card-foreground mt-2 text-sm">
              {project.description}
            </p>
            <p className="text-muted-foreground mt-1 text-xs">
              Tools: {project.tools.join(", ")}
            </p>
            {project.link && (
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary mt-3 inline-block font-medium hover:underline"
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
