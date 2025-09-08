// export const CONTACT = {
//   email: "shreyp2305@gmail.com",
//   subject: "Let’s Connect!",
//   body: "Hi Shrey, I’d love to get in touch with you.",
//   linkedin: "https://www.linkedin.com/in/shreyp2305",
//   github: "https://github.com/shreyp2305",
// };
export const CONTACT = [
  {
    platform: "Email",
    link: "mailto:shreyp2305@gmail.com?subject=Let%E2%80%99s%20Connect!&body=Hi%20Shrey%2C%20I%E2%80%99d%20love%20to%20get%20in%20touch%20with%20you.",
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
    achievements: [],
    tools: ["Next.js", "OpenAI", "LangChain", "Redis", "Vercel"],
  },
  {
    title: "Jobhub",
    description:
      "Virginia Tech’s official portal for managing industry partnership programs and department workflows.",
    link: "https://cssource-jh.discovery.cs.vt.edu/",
    achievements: [
      "Worked in a 5-person team to develop a web portal for Virginia Tech to manage its industry partnership programs.",
      "Designed backend services in Flask to handle department-level operations and user permissions across the platform.",
      "Deployed workloads on Virginia Tech’s Kubernetes platform via GitLab CI/CD and Docker, ensuring reliable scaling.",
    ],
    tools: ["React", "Flask", "PostreSQL", "Docker", "Kubernetes"],
  },
  {
    title: "House.inc",
    description:
      "A housing recommendation platform that helps users find housing and roommates using a conversational search assistant.",
    link: "https://devpost.com/software/house-inc",
    achievements: [
      "Took ownership of backend development in a team of 4, designing service layer components within a client-server architecture for housing recommendations.",
      "Integrated Azure AI for natural language query parsing, enabling contextual housing search via a conversational assistant.",
    ],
    tools: ["React", "Spring Boot", "MySQL", "AzureAI"],
  },
  {
    title: "Blu-pay",
    description:
      "An app to simplify real-time expense splitting among friends, leveraging Bluetooth to detect nearby devices.",
    link: "https://github.com/czarthak/BluPay",
    achievements: [],
    tools: ["Kotlin", "Android Studio"],
  },
  {
    title: "Cinder",
    description:
      "A Tinder-inspired carpooling system that intelligently matches commuters based on their routes",
    link: "https://devpost.com/software/cinder-4fr06j",
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
      "Worked on NASA’s Space Exploration Network Services program, supporting telemetry tracking and command systems for 3+ ground stations. Collaborated with a full-stack team of 8 engineers to deliver new functionality on a biweekly sprint cadence. My work focused on developing backend APIs, optimizing system performance, refactoring front-end dashboards, and ensuring reliable delivery through automated testing and CI/CD integration.",
    achievements: [
      "Developed Java-based microservices and REST APIs to enable real-time satellite telemetry services across 3+ ground stations.",
      "Transformed 20+ React components into reusable styled components, reducing future UI development time.",
      "Refactored existing API structure for modem and switch telemetry endpoints, achieving 17% lower network overhead.",
      "Implemented subsystem-specific RabbitMQ channels as part of a broader system re-architecture to reduce message queuing latency by 23%.",
      "Built and maintained unit and integration test suites with Jest and Mockito automating regression testing and integrating into CI/CD pipelines.",
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
      "Contributed to the development and optimization of a large-scale ERP platform serving over 35 federal agencies. My work focused on improving database performance, designing pipelines, and building dynamic dashboards to support critical reporting and operational needs across multiple organizations.",
    achievements: [
      "Partnered with database architects to expand ERP capabilities across 35+ federal agencies by designing multi-agency schemas.",
      "Accelerated reporting turnaround from days to minutes by developing dynamic UI dashboards which enabled self-service access to financial and user activity data.",
      "Automated compliance checks across 5 environments with PL/SQL procedures for policy validation.",
      "Designed Python pipelines to process 133K+ Active Directory records weekly, replacing PowerShell scripts and improving runtime by 88%.",
    ],
    tools: ["Python", "Oracle Database", "PL/SQL"],
  },
  {
    role: "Teaching Assistant",
    company: "Virginia Tech",
    date: "Spring 2024",
    description:
      "Assisted in teaching the Relational Database Management Systems course, guiding students through lab exercises and conceptual lessons. Supported students with topics such as SQL optimization, schema design, and transaction processing.",
    achievements: [
      "Guided 80+ students through weekly lab sessions, providing support on database design and SQL queries.",
      "Topics covered: query optimization, normalization, transaction management, indexing, ER modeling, schema design.",
    ],
    tools: ["SQL"],
  },
  {
    role: "Software Engineer Intern",
    company: "Ventera",
    date: "Summer 2023",
    description:
      "Joined a cross-functional team building secure, cloud-based applications for enterprise clients. Worked to improve system performance, reliability, and security, while connecting key workflows and services to support business operations. My contributions helped the team deliver smoother, faster, and more secure applications that met both user and organizational needs.",
    achievements: [
      "Tackled API latency issues by redesigning data access patterns and introducing strategic caching, meeting a critical performance goal of sub-250ms response times.",
      "Authored 30+ tests mocking API calls and components, raising code coverage from 67% to 97% post-rewrite.",
      "Integrated OAuth 2.0 and multi-factor authentication using Azure AD B2C to secure enterprise login for 500+ employees.",
      "Developed a scalable middleware service to seamlessly connect Azure AI Foundry and process 250+ documents weekly.",
    ],
    tools: [
      "Express",
      "Angular",
      "Azure AI Foundry",
      "Azure AD B2C",
      "Redis",
      "Mocha",
      "Chai",
    ],
  },
  {
    role: "Resident Advisor",
    company: "Virginia Tech",
    date: "Jan 2022 – May 2023",
    description:
      "Supported the well-being and development of 150+ students while fostering a safe and inclusive community. Organized educational, social, and wellness programs each semester to strengthen engagement and connection among residents.",
    achievements: [
      "Oversaw the well-being and safety of 150+ residents, fostering a supportive and inclusive community.",
      "Planned and executed 4 educational, social, and wellness programs each semester, increasing resident engagement.",
    ],
    tools: [],
  },
];
