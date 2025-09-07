import { Mail, Github, Linkedin } from "lucide-react";
import { CONTACT } from "@/data/portfolioConfig";
import Link from "next/link";

export default function Contact() {
  // Build mailto link once, with encoded params
  const mailTo = `mailto:${encodeURIComponent(CONTACT.email)}?subject=${encodeURIComponent(
    CONTACT.subject,
  )}&body=${encodeURIComponent(CONTACT.body)}`;

  return (
    <main className="mx-auto max-w-3xl p-6 text-center">
      <h1 className="mb-4 text-3xl font-bold">Contact Me</h1>
      <p className="mb-8 text-[var(--muted-foreground)]">
        Let’s connect! Reach out through any of the links below.
      </p>
      <div className="flex flex-col items-center gap-4">
        <Link
          href={mailTo}
          className="flex w-56 items-center justify-center gap-2 rounded-2xl border bg-primary p-3 text-primary-foreground shadow-sm transition hover:opacity-90"
        >
          <Mail size={20} />
          <span>Email</span>
        </Link>
        <Link
          href={CONTACT.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-56 items-center justify-center gap-2 rounded-2xl border bg-primary p-3 text-primary-foreground shadow-sm transition hover:opacity-90"
        >
          <Linkedin size={20} />
          <span>LinkedIn</span>
        </Link>
        <Link
          href={CONTACT.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-56 items-center justify-center gap-2 rounded-2xl border bg-primary p-3 text-primary-foreground shadow-sm transition hover:opacity-90"
        >
          <Github size={20} />
          <span>GitHub</span>
        </Link>
      </div>
    </main>
  );
}
