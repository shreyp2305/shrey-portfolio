"use client";

import { H1 } from "@/components/ui/H1";
import { PROJECTS } from "@/data/portfolioConfig";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";

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

export default function Projects() {
  return (
    <main className="mx-auto max-w-5xl p-6">
      <H1 className="mb-4 text-3xl font-bold">Projects</H1>
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
            className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:shadow-md"
            variants={cardVariants}
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
              <h2 className="text-xl font-semibold text-card-foreground">
                {project.title}
              </h2>
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
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-block rounded-xl bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground transition hover:scale-105 hover:opacity-90"
                >
                  View Project
                </Link>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
}
