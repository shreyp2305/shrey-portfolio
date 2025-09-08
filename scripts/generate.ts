import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { DocumentInterface } from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { getEmbeddingsCollection, getVectorStore } from "../src/lib/astradb";

// import your config directly
import { CONTACT, PROJECTS, EXPERIENCES } from "../src/data/portfolioConfig";

async function generateEmbeddings() {
  const vectorStore = await getVectorStore();
  (await getEmbeddingsCollection()).deleteMany({});

  // build docs from structured config instead of parsing files
  const docs: DocumentInterface[] = [];

  // CONTACT
  const contactSummary = CONTACT.map((c) => `${c.platform}: "${c.link}"`).join(
    ", ",
  );
  docs.push({
    pageContent: `Contact information available — ${contactSummary}`,
    metadata: { url: "/contact", type: "contact" },
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
    docs.push({
      pageContent: `${project.title}: ${project.description} ${achievements} ${tools}`,
      metadata: {
        url: "/projects",
        type: "project",
        title: project.title,
        link: project.link,
      },
    });
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
    docs.push({
      pageContent: `${exp.role} at ${exp.company} (${exp.date}): ${exp.description} ${achievements} ${tools}`,
      metadata: {
        url: "/experience",
        type: "experience",
        role: exp.role,
        company: exp.company,
      },
    });
  });

  // split + embed
  const splitter = RecursiveCharacterTextSplitter.fromLanguage("markdown");
  const splitDocs = await splitter.splitDocuments(docs);

  await vectorStore.addDocuments(splitDocs);
}

generateEmbeddings();
