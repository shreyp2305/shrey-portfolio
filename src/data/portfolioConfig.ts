import personal_portfolio_website_image from "@/assets/personal-portfolio-website.png";
import jobhub_image from "@/assets/jobhub.png";
import house_inc_image from "@/assets/house_inc.png";
import cinder from "@/assets/cinder.png";

export const CONTACT = [
  {
    platform: "Email",
    link: "shreyp2305@gmail.com",
  },
  { platform: "LinkedIn", link: "https://www.linkedin.com/in/shreyp2305" },
  { platform: "Github", link: "https://github.com/shreyp2305" },
];

export const PROJECTS = [
  {
    title: "Personal Portfolio Website",
    description:
      "A website to display my projects, experience, and technical skills.",
    link: "https://github.com/shreyp2305/shrey-portfolio",
    image: personal_portfolio_website_image,
    achievements: [
      "Built an AI-powered chatbot that answers natural language questions about portfolio content.",
      "Orchestrated retrieval-augmented generation (RAG) through LangChain and Vercel’s AI SDK with GPT-5-nano.",
      "Designed a AstraDB vector database to store OpenAI’s text-embeddings of portfolio data for semantic search.",
      "Implemented cache-aware querying with a serverless Redis instance to reduce latency and operatonal costs.",
    ],
    tools: [
      "Next.js",
      "OpenAI",
      "LangChain",
      "Redis",
      "Vercel",
      "Vercel AI SDK",
      "AstraDB",
      "Upstash Redis",
    ],
  },
  {
    title: "Jobhub",
    description:
      "Virginia Tech’s official portal for managing industry partnership programs and department workflows.",
    link: "https://cssource-jh.discovery.cs.vt.edu/",
    image: jobhub_image,
    achievements: [
      "Worked in a 5-person team to develop a web portal for Virginia Tech to manage its industry partnership programs.",
      "Enhanced Flask endpoints in Python, expanding parameters and enforcing JWT RBAC for confidential data.",
      "Deployed workloads on Virginia Tech’s Kubernetes platform via GitLab CI/CD and Docker, ensuring reliable scaling.",
    ],
    tools: ["React", "Flask", "PostreSQL", "Docker", "Kubernetes"],
  },
  {
    title: "House.inc",
    description:
      "A housing recommendation platform that helps users find housing and roommates using a conversational search assistant.",
    link: "https://devpost.com/software/house-inc",
    image: house_inc_image,
    achievements: [
      "Took ownership of backend development in a team of 4, designing service layer components within a client-server architecture for housing recommendations.",
      "Integrated Azure AI for natural language query parsing, enabling contextual housing search via a conversational assistant.",
    ],
    tools: ["React", "Spring Boot", "MySQL", "AzureAI"],
  },
  // {
  //   title: "Blu-pay",
  //   description:
  //     "An app to simplify real-time expense splitting among friends, leveraging Bluetooth to detect nearby devices.",
  //   link: "https://github.com/czarthak/BluPay",
  //   achievements: [],
  //   tools: ["Kotlin", "Android Studio"],
  // },
  {
    title: "Cinder",
    description:
      "A Tinder-inspired carpooling system that intelligently matches commuters based on their routes",
    link: "https://devpost.com/software/cinder-4fr06j",
    image: cinder,
    achievements: [],
    tools: ["MongoDB", "Express", "React", "NodeJS"],
  },
];

export const EXPERIENCES = [
  {
    role: "Software Engineer Intern",
    company: "Peraton",
    date: "Fall 2024",
    description:
      "Worked on NASA’s Space Exploration Network Services program, supporting telemetry tracking and command systems for 3+ ground stations.",
    achievements: [
      "Developed Java-based microservices and REST APIs to enable real-time satellite telemetry services across 3+ ground stations.",
      "Transformed 20+ React components into reusable styled components, reducing future UI development time.",
      "Refactored existing API structure for modem and switch telemetry endpoints, achieving 17% lower network overhead.",
      "Implemented subsystem-specific RabbitMQ channels as part of a broader system re-architecture to reduce message queuing latency by 23%.",
    ],
    tools: [
      "React",
      "Spring Boot",
      "MongoDB",
      "RabbitMQ",
      "Docker",
      "Kubernetes",
    ],
  },
  {
    role: "Software Engineer Intern",
    company: "CACI",
    date: "Summer 2024",
    description:
      "Contributed to the development and optimization of a large-scale ERP platform serving over 35 federal agencies.",
    achievements: [
      "Reduced query execution time by 15% on transaction tables by implementing composite indexing and partitioning strategies.",
      "Accelerated reporting turnaround from days to minutes by developing dynamic UI dashboards which enabled self-service access to financial and user activity data.",
      "Designed Python pipelines to process 133K+ Active Directory records weekly, replacing legacy PowerShell scripts and improving runtime by 88%.",
    ],
    tools: ["Python", "Oracle Database", "PL/SQL"],
  },
  {
    role: "Teaching Assistant",
    company: "Virginia Tech",
    date: "Spring 2024",
    description:
      "Assisted in teaching the Relational Database Management Systems course, guiding students through lab exercises and conceptual lessons. Supported students with topics such as SQL optimization, schema design, normalization, indexing, and transaction processing.",
    achievements: [],
    tools: ["SQL"],
  },
  {
    role: "Software Engineer Intern",
    company: "Ventera",
    date: "Summer 2023",
    description:
      "Contributed to an R&D team developing secure, cloud-based applications to support upcoming government contract bids.",
    achievements: [
      "Deployed scalable RESTful APIs to handle user interaction and content delivery for 1,000+ daily users, incorporating optimized query handling and caching techniques.",
      "Authored 30+ tests mocking API calls and components, raising code coverage from 67% to 97% post-rewrite.",
      "Established performance testing suit integrated with Jenkins that uncovered excess Kubernetes resource allocations and cut CPU by 25% alongside memory and pods by 15%.",
      "Integrated OAuth 2.0 and multi-factor authentication using Azure AD B2C to secure enterprise login workflows.",
    ],
    tools: [
      "Express",
      "Angular",
      "Azure AD B2C",
      "Kubernetes",
      "Jenkins",
      "Mocha",
      "Chai",
    ],
  },
];
