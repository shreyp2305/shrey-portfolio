import { H1 } from "@/components/ui/H1";
import { EXPERIENCES } from "@/data/portfolioConfig";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Experience",
  description: "Learn more about my experience as a software engineer.",
};

export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <H1 className="text-3xl font-bold">Experience</H1>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-2xl bg-primary px-6 py-3 font-medium text-primary-foreground shadow-md transition hover:scale-105 hover:opacity-90"
        >
          My Resume
        </a>
      </div>

      <div className="grid gap-6">
        {EXPERIENCES.map((exp, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold">
                {exp.role} <span className="text-primary">@ {exp.company}</span>
              </h2>
              <span className="mt-1 text-sm text-muted-foreground sm:mt-0">
                {exp.date}
              </span>
            </div>

            <p className="mt-3 text-muted-foreground">{exp.description}</p>

            {exp.tools && exp.tools.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {exp.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
