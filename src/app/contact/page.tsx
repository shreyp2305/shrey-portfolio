import { Mail, Github, Linkedin } from "lucide-react";
import { CONTACT } from "@/data/portfolioConfig";
import Link from "next/link";
import { H1 } from "@/components/ui/H1";

export default function Contact() {
  // Build mailto link once, with encoded params
  const mailTo = `mailto:${encodeURIComponent(CONTACT.email)}?subject=${encodeURIComponent(
    CONTACT.subject,
  )}&body=${encodeURIComponent(CONTACT.body)}`;

  return (
    <main className="mx-auto max-w-3xl p-6 text-center">
      <H1 className="mb-4 text-3xl font-bold">Contact Me</H1>
      <p className="text-muted-foreground mb-8">
        Let’s connect! Reach out through any of the links below.
      </p>
      <div className="flex flex-row items-center gap-4">
        <Link
          href={mailTo}
          className="bg-primary text-primary-foreground flex w-56 items-center justify-center gap-2 rounded-2xl border p-3 shadow-sm transition hover:opacity-90"
        >
          <Mail size={20} />
          <span>Email</span>
        </Link>
        <Link
          href={CONTACT.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary text-primary-foreground flex w-56 items-center justify-center gap-2 rounded-2xl border p-3 shadow-sm transition hover:opacity-90"
        >
          <Linkedin size={20} />
          <span>LinkedIn</span>
        </Link>
        <Link
          href={CONTACT.github}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary text-primary-foreground flex w-56 items-center justify-center gap-2 rounded-2xl border p-3 shadow-sm transition hover:opacity-90"
        >
          <Github size={20} />
          <span>GitHub</span>
        </Link>
      </div>
    </main>
  );
}
