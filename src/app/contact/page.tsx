"use client";

import { Mail, Github, Linkedin } from "lucide-react";
import { CONTACT } from "@/data/portfolioConfig";
import Link from "next/link";
import { H1 } from "@/components/ui/H1";
import { motion } from "framer-motion";

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

// Motion variants
const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function Contact() {
  return (
    <main className="mx-auto max-w-3xl p-6 text-center">
      <H1 className="mb-4 text-3xl font-bold">Contact Me</H1>
      <p className="mb-8 text-muted-foreground">
        Let’s connect! Reach out through any of the links below.
      </p>

      <motion.div
        className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {CONTACT.map(({ platform, link }) => {
          const href =
            platform === "Email"
              ? `mailto:${link}?subject=${encodeURIComponent(
                  MAILTO_CONFIG.subject,
                )}&body=${encodeURIComponent(MAILTO_CONFIG.body)}`
              : link;

          return (
            <motion.div
              key={platform}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={href}
                target={platform !== "Email" ? "_blank" : undefined}
                rel={platform !== "Email" ? "noopener noreferrer" : undefined}
                className="flex w-56 items-center justify-center gap-2 rounded-2xl border bg-primary p-3 text-primary-foreground shadow-sm transition hover:opacity-90"
              >
                {iconMap[platform]}
                <span>{platform}</span>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </main>
  );
}
