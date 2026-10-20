"use client";

import { H1 } from "@/components/ui/H1";
import { H2 } from "@/components/ui/H2";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import profile_picture from "@/assets/linkedin_photo.jpg";
import { Bot, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";
import { CONTACT, EXPERIENCES, PROJECTS } from "@/data/portfolioConfig";

import personal_portfolio_website_image from "@/assets/personal-portfolio-website.png";
import jobhub_image from "@/assets/jobhub.png";
import house_inc_image from "@/assets/house-inc.png";
import cinder_image from "@/assets/cinder.png";

const imageMap: Record<string, StaticImageData> = {
  personal_portfolio_website_image,
  jobhub_image,
  house_inc_image,
  cinder_image,
};

const iconMap: Record<string, React.ReactNode> = {
  Email: <Mail size={20} />,
  LinkedIn: <LinkedinIcon size={20} />,
  Github: <GithubIcon size={20} />,
};

// Config for email link params
const MAILTO_CONFIG = {
  subject: "Let’s Connect!",
  body: "Hi Shrey, I’d love to get in touch with you.",
};

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl space-y-28 px-4 py-16">
      {/* Hero */}
      <section id="home" className="grid grid-cols-1 items-center gap-12 sm:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-6 text-center sm:text-left"
        >
          <H1 className="text-4xl sm:text-5xl">Hi, I&apos;m Shrey 👋</H1>
          <p className="mx-auto max-w-md text-lg text-muted-foreground sm:mx-0">
            A Software Engineer with an interest in building scalable,
            user-centered applications across the full stack.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <Image
            src={profile_picture}
            alt="A photo of me"
            width={320}
            height={320}
            className="aspect-square rounded-full border-4 border-primary/30 object-cover shadow-xl"
          />
        </motion.div>
      </section>

      {/* Chatbot highlight */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center space-y-5 text-center"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mb-3 flex items-center gap-3"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
            <Bot size={28} className="text-primary" />
          </div>
          <span className="text-lg font-semibold">
            Chat with my AI assistant
          </span>
        </motion.div>

        <p className="max-w-lg text-muted-foreground">
          You can ask the chatbot any question about me and it will find the
          relevant info on this website.
        </p>
      </motion.section>

      {/* Experience */}
      <section id="experience">
        <div className="mb-8 flex items-center justify-between">
          <H2 className="text-3xl font-bold">Experience</H2>
          <motion.a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="rounded-2xl bg-primary px-6 py-3 font-medium text-primary-foreground shadow-md transition hover:opacity-90"
          >
            My Resume
          </motion.a>
        </div>

        <motion.div
          className="relative space-y-10 border-l-2 border-border pl-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {EXPERIENCES.map((exp, idx) => (
            <motion.div
              key={idx}
              className="relative"
              variants={cardVariants}
              whileHover={{ y: -6, boxShadow: "0 12px 24px -8px rgb(0 0 0 / 0.18)" }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
            >
              {/* Timeline marker */}
              <span className="absolute top-7 -left-[39px] h-3.5 w-3.5 rounded-full border-2 border-primary bg-background" />

              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-7">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-card-foreground sm:text-xl">
                      {exp.role}
                    </h3>
                    <p className="mt-0.5 text-sm font-medium text-primary">
                      {exp.company}
                    </p>
                  </div>
                  <span className="inline-flex w-fit items-center rounded-full bg-muted px-3 py-1 text-xs font-medium whitespace-nowrap text-muted-foreground">
                    {exp.date}
                  </span>
                </div>

                {exp.description && (
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {exp.description}
                  </p>
                )}

                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="mt-4 space-y-2.5">
                    {exp.achievements.map((achievement, achievementIdx) => (
                      <li
                        key={achievementIdx}
                        className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-primary/60" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {exp.tools && exp.tools.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2 border-t border-border/60 pt-4">
                    {exp.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Projects */}
      <section id="projects">
        <H2 className="mb-4 text-3xl font-bold">Projects</H2>
        <p className="mb-10 text-muted-foreground">
          A collection of things I’ve built. Each project reflects my interests
          and skills.
        </p>

        <motion.div
          className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
              variants={cardVariants}
              whileHover={{ y: -6, boxShadow: "0 12px 24px -8px rgb(0 0 0 / 0.18)" }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
            >
              {imageMap[project.imageKey] && (
                <div className="relative h-40 w-full">
                  <Image
                    src={imageMap[project.imageKey]}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-xl font-semibold text-card-foreground">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {project.description}
                </p>

                {project.tools && project.tools.length > 0 && (
                  <div className="my-3 flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                )}

                {project.link && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="mt-auto"
                  >
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-xl bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground transition hover:opacity-90"
                    >
                      View Project
                    </Link>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Contact */}
      <section id="contact" className="text-center">
        <H2 className="mb-4 text-3xl font-bold">Contact Me</H2>
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
                variants={cardVariants}
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
      </section>
    </main>
  );
}
