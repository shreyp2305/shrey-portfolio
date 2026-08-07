export const CONTACT = [
  {
    platform: "Email",
    link: "shreyp2305@gmail.com",
  },
  { platform: "LinkedIn", link: "https://www.linkedin.com/in/shreyp2305" },
  { platform: "Github", link: "https://github.com/shreyp2305" },
];

export const SKILLS = [
  {
    category: "Languages",
    items: ["Java", "Python", "TypeScript/JavaScript", "C/C++", "C#", "SQL"],
  },
  {
    category: "Frameworks & Libraries",
    items: [
      "Spring",
      ".NET",
      "Flask",
      "React",
      "Next.js",
      "Node.js",
      "LangChain",
      "JUnit",
      "Cypress",
      "Jest",
    ],
  },
  {
    category: "Messaging & Databases",
    items: ["RabbitMQ", "Kafka", "PostgreSQL", "MongoDB", "Redis"],
  },
  {
    category: "Cloud/DevOps",
    items: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform", "Git"],
  },
];

export const EDUCATION = [
  {
    school: "Virginia Tech",
    degree: "Bachelor of Science, Computer Science",
    date: "May 2025",
    location: "Blacksburg, VA",
    gpa: "3.9",
    courses: [
      "Data Structures and Algorithms",
      "Operating Systems",
      "Computer Architecture",
      "Database Management Systems",
      "Cloud Software Development",
      "Intro to AI",
      "Machine Learning",
    ],
  },
];

export const PROJECTS = [
  {
    title: "Personal Portfolio Website",
    description:
      "A website to display my projects, experience, and technical skills.",
    link: "https://github.com/shreyp2305/shrey-portfolio",
    imageKey: "personal_portfolio_website_image",
    achievements: [
      "Implemented a RAG pipeline using LangChain and GPT-5 to answer natural language queries about my experience, routing semantic search through a vector store via Vercel’s AI SDK.",
      "Added a serverless Redis caching layer for repeated queries, reducing inference latency and cutting operational cost.",
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
      "Virginia Tech’s official industry-partnership portal, built as my senior capstone project.",
    link: "https://jobhub.cs.vt.edu/",
    imageKey: "jobhub_image",
    achievements: [
      "Designed and shipped a university industry-partnership portal for Virginia Tech's CS department as primary backend developer on a 5-person team, serving 100+ industry partners.",
      "Delivered a multi-tier sponsorship system in Flask and PostgreSQL managing partner relationships, event workflows, and financial tiers, replacing a manual email-based coordination process used by the department.",
    ],
    tools: ["React", "Flask", "PostgreSQL", "Docker", "Kubernetes"],
  },
  {
    title: "House.inc",
    description:
      "A housing recommendation platform that helps users find housing and roommates using a conversational search assistant.",
    link: "https://devpost.com/software/house-inc",
    imageKey: "house_inc_image",
    achievements: [
      "Took ownership of backend development in a team of 4, designing service layer components within a client-server architecture for housing recommendations.",
      "Integrated Azure AI for natural language query parsing, enabling contextual housing search via a conversational assistant.",
    ],
    tools: ["React", "Spring Boot", "MySQL", "AzureAI"],
  },
  {
    title: "Cinder",
    description:
      "A Tinder-inspired carpooling system that intelligently matches commuters based on their routes",
    link: "https://devpost.com/software/cinder-4fr06j",
    imageKey: "cinder_image",
    achievements: [],
    tools: ["MongoDB", "Express", "React", "NodeJS"],
  },
];

export const EXPERIENCES = [
  {
    role: "Full-Stack Software Engineer",
    company: "Integration Innovation",
    date: "Oct 2025 – Present",
    description:
      "Building the primary Command and Control (C2) platform for a fleet of autonomous vehicles, from geospatial mission planning to real-time operator handoff.",
    achievements: [
      "Shipped a Command and Control (C2) platform to production, becoming the default control path across 13 autonomous vehicles and the primary feature demoed to the US Marine Corps.",
      "Built a geospatial mission-planning toolset on OpenLayers from scratch, enabling operators to define geofences, program search areas, and route autonomous vehicles directly on a live map.",
      "Designed and built a real-time operator handoff system in .NET enabling live ownership transfers across vehicle control queues, with atomic state transitions guaranteeing exclusive control with zero conflicts across 50+ concurrent users.",
      "Built an end-to-end test suite covering 23 mission-critical flows with Cypress and Cucumber, cutting release QA from 2 days to 20 minutes.",
    ],
    tools: [".NET", "React", "OpenLayers", "Cypress", "Cucumber", "Docker", "Kubernetes"],
  },
  {
    role: "Full-Stack Software Engineer Intern",
    company: "Peraton",
    date: "Aug 2024 – Feb 2025",
    description:
      "Supported NASA's Space Exploration Network Services program, building high-throughput microservices for real-time satellite telemetry across a network of distributed ground stations.",
    achievements: [
      "Engineered high-throughput Java microservices to orchestrate real-time NASA satellite telemetry streams across 5 distributed ground stations, ensuring zero data loss for 100+ concurrent flight controllers.",
      "Redesigned RabbitMQ message topology for ground station subsystems, reducing queuing latency 70% (800ms → 240ms) and eliminating message loss under peak operator load.",
      "Built an internal RAG agent over ops documentation, deflecting ~55% of tier-1 questions and rolling out to the full team.",
    ],
    tools: ["React", "Spring Boot", "MongoDB", "RabbitMQ", "LangChain", "Docker", "Kubernetes"],
  },
  {
    role: "Full-Stack Software Engineer Intern",
    company: "CACI",
    date: "May 2024 – Aug 2024",
    description:
      "Contributed to an enterprise data platform, re-architecting a large-scale data validation engine and building internal analytics tooling.",
    achievements: [
      "Re-architected an enterprise data validation engine across 8M+ records, leveraging composite indexing to cut query latency by 80% (from 1s to under 200ms).",
      "Built internal analytics APIs serving thousands of daily reports, replacing a $30K/year third-party vendor tool.",
    ],
    tools: ["Python", "Oracle Database", "PL/SQL"],
  },
  {
    role: "Teaching Assistant",
    company: "Virginia Tech",
    date: "May 2024 – Aug 2024",
    description:
      "Assisted in teaching the Relational Database Management Systems course, guiding students through lab exercises and conceptual lessons. Supported students with topics such as SQL optimization, schema design, normalization, indexing, and transaction processing.",
    achievements: [
      "Guided 80+ students through weekly lab sessions, providing support on database design and SQL queries", 
      "Topics covered: query optimization, normalization, transaction management, indexing, ER modeling, schema design."
    ],
    tools: ["SQL"],
  },
  {
    role: "Full-Stack Software Engineer Intern",
    company: "Ventera",
    date: "May 2023 – Aug 2023",
    description:
      "Contributed to an R&D team developing secure, cloud-based applications to support upcoming government contract bids.",
    achievements: [
      "Scaled Node.js APIs serving 1,000+ daily users by migrating high-traffic endpoints to a Redis cache-aside pattern, cutting TTFB 90% and increasing throughput 3x.",
      "Identified over-provisioned Kubernetes workloads through a Jenkins-integrated performance testing suite, reducing CPU usage 25% and memory and pod counts 15%.",
    ],
    tools: ["Node.js", "Angular", "Redis", "Kubernetes", "Jenkins", "Mocha", "Chai"],
  },
];
