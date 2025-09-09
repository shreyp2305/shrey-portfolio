import { Mail, Github, Linkedin } from "lucide-react";
import { CONTACT } from "@/data/portfolioConfig";
import Link from "next/link";
import { H1 } from "@/components/ui/H1";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Contact info",
  description: "Learn more about how you can connect with me.",
};

const iconMap: Record<string, React.ReactNode> = {
  Email: <Mail size={20} />,
  LinkedIn: <Linkedin size={20} />,
  Github: <Github size={20} />,
};

// Config for email link params
const MAILTO_CONFIG = {
  subject: "Let’s Connect!",
  body: "Hi Shrey, I’d love to get in touch with you.",
};

export default function Contact() {
  return (
    <main className="mx-auto max-w-3xl p-6 text-center">
      <H1 className="mb-4 text-3xl font-bold">Contact Me</H1>
      <p className="mb-8 text-muted-foreground">
        Let’s connect! Reach out through any of the links below.
      </p>
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        {CONTACT.map(({ platform, link }) => {
          const href =
            platform === "Email"
              ? `mailto:${link}?subject=${encodeURIComponent(
                  MAILTO_CONFIG.subject,
                )}&body=${encodeURIComponent(MAILTO_CONFIG.body)}`
              : link;

          return (
            <Link
              key={platform}
              href={href}
              target={platform !== "Email" ? "_blank" : undefined}
              rel={platform !== "Email" ? "noopener noreferrer" : undefined}
              className="flex w-56 items-center justify-center gap-2 rounded-2xl border bg-primary p-3 text-primary-foreground shadow-sm transition hover:opacity-90"
            >
              {iconMap[platform]}
              <span>{platform}</span>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
