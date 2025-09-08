import { H1 } from "@/components/ui/H1";
import { H2 } from "@/components/ui/H2";
import { EXPERIENCES } from "@/data/portfolioConfig";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Experience",
  description: "Learn more about my experience as a software engineer.",
};

export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <H1 className="text-3xl font-bold">Experience</H1>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-2xl bg-primary px-6 py-3 font-medium text-primary-foreground transition hover:opacity-90"
        >
          My Resume
        </a>
      </div>

      <div className="space-y-6">
        {EXPERIENCES.map((exp, idx) => (
          <div key={idx} className="border-b border-border pb-4">
            <H2 className="text-xl font-semibold">{exp.role}</H2>
            <p className="text-sm text-muted-foreground">
              {exp.company} | {exp.date}
            </p>
            <p className="mt-2">{exp.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
