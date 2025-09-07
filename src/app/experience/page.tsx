import { EXPERIENCES } from "@/data/portfolioConfig";

export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Experience</h1>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary text-primary-foreground inline-block rounded-2xl px-6 py-3 font-medium transition hover:opacity-90"
        >
          View Resume
        </a>
      </div>

      <div className="space-y-6">
        {EXPERIENCES.map((exp, idx) => (
          <div key={idx} className="border-border border-b pb-4">
            <h2 className="text-xl font-semibold">{exp.role}</h2>
            <p className="text-muted-foreground text-sm">
              {exp.company} | {exp.date}
            </p>
            <p className="mt-2">{exp.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
