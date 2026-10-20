import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { Document } from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { clearCollection, insertChunks } from "../src/lib/astradb";

// import your config directly
import {
  CONTACT,
  SKILLS,
  EDUCATION,
  PROJECTS,
  EXPERIENCES,
} from "../src/data/portfolioConfig";

async function generateEmbeddings() {
  await clearCollection();

  // build docs from structured config instead of parsing files
  const docs: Document[] = [];

  // CONTACT
  const contactSummary = CONTACT.map((c) => `${c.platform}: "${c.link}"`).join(
    ", ",
  );
  docs.push(
    new Document({
      pageContent: `Contact information available — ${contactSummary}`,
      metadata: { url: "/#contact", type: "contact" },
    }),
  );

  // SKILLS
  const skillsSummary = SKILLS.map(
    (s) => `${s.category}: ${s.items.join(", ")}`,
  ).join(". ");
  docs.push(
    new Document({
      pageContent: `Technical skills — ${skillsSummary}`,
      metadata: { url: "/", type: "skills" },
    }),
  );

  // EDUCATION
  EDUCATION.forEach((edu) => {
    const courses =
      edu.courses && edu.courses.length > 0
        ? `Relevant coursework: ${edu.courses.join(", ")}.`
        : "";
    docs.push(
      new Document({
        pageContent: `${edu.degree} from ${edu.school} (${edu.date}), ${edu.location}. GPA: ${edu.gpa}. ${courses}`,
        metadata: {
          url: "/",
          type: "education",
          title: edu.school,
        },
      }),
    );
  });

  // PROJECTS
  PROJECTS.forEach((project) => {
    const achievements =
      project.achievements && project.achievements.length > 0
        ? `Key achievements: ${project.achievements.join("; ")}`
        : "";
    const tools =
      project.tools && project.tools.length > 0
        ? `Built with ${project.tools.join(", ")}.`
        : "";
    docs.push(
      new Document({
        pageContent: `${project.title}: ${project.description} ${achievements} ${tools}`,
        metadata: {
          url: "/#projects",
          type: "project",
          title: project.title,
          link: project.link,
        },
      }),
    );
  });

  // EXPERIENCES
  EXPERIENCES.forEach((exp) => {
    const achievements =
      exp.achievements && exp.achievements.length > 0
        ? `Key Achievements: ${exp.achievements.join("; ")}`
        : "";
    const tools =
      exp.tools && exp.tools.length > 0
        ? `Technologis Used: ${exp.tools.join(", ")}.`
        : "";
    docs.push(
      new Document({
        pageContent: `${exp.role} at ${exp.company} (${exp.date}): ${exp.description} ${achievements} ${tools}`,
        metadata: {
          url: "/#experience",
          type: "experience",
          role: exp.role,
          company: exp.company,
        },
      }),
    );
  });

  // split + embed + insert
  const splitter = RecursiveCharacterTextSplitter.fromLanguage("markdown");
  const splitDocs = await splitter.splitDocuments(docs);

  await insertChunks(
    splitDocs.map((doc) => ({
      pageContent: doc.pageContent,
      metadata: doc.metadata,
    })),
  );
  // console.log(splitDocs);
}

generateEmbeddings();
