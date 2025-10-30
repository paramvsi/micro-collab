import { faker } from "@faker-js/faker";
import type { DemoRequest, DemoUser, DemoOffer } from "@/types/demo";

// Predefined skill pools for realistic data
const SKILLS = [
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "UI/UX",
  "Testing",
  "DevOps",
  "GraphQL",
  "Next.js",
  "Tailwind",
  "PostgreSQL",
  "MongoDB",
  "AWS",
  "Docker",
  "Git",
];

const REQUEST_TEMPLATES = [
  {
    title: "Need help refactoring React components",
    description:
      "I have a legacy React app with large components. Need help breaking them down into smaller, reusable pieces with proper TypeScript types.",
    tags: ["React", "TypeScript", "Refactoring"],
  },
  {
    title: "API rate limiting implementation",
    description:
      "Building a Node.js API and need to implement rate limiting with Redis. Looking for someone with experience in this area.",
    tags: ["Node.js", "Redis", "Backend"],
  },
  {
    title: "Tailwind migration from CSS modules",
    description:
      "Want to migrate my Next.js project from CSS modules to Tailwind. Need guidance on best practices and responsive design patterns.",
    tags: ["Tailwind", "Next.js", "CSS"],
  },
  {
    title: "GraphQL schema design review",
    description:
      "Need an experienced GraphQL developer to review my schema design and suggest improvements for better performance and scalability.",
    tags: ["GraphQL", "Backend", "Architecture"],
  },
  {
    title: "Docker compose setup for development",
    description:
      "Setting up a multi-container Docker environment for my app. Need help with networking, volumes, and environment configuration.",
    tags: ["Docker", "DevOps", "Infrastructure"],
  },
  {
    title: "PostgreSQL query optimization",
    description:
      "Have some slow queries in my app. Need someone to help analyze and optimize them with proper indexing and query structure.",
    tags: ["PostgreSQL", "Database", "Performance"],
  },
  {
    title: "Testing strategy for React app",
    description:
      "Want to set up comprehensive testing (unit, integration, E2E) for my React application. Need guidance on best tools and patterns.",
    tags: ["Testing", "React", "Quality"],
  },
  {
    title: "AWS deployment pipeline setup",
    description:
      "Need help setting up a CI/CD pipeline for deploying my Next.js app to AWS with proper staging and production environments.",
    tags: ["AWS", "DevOps", "Next.js"],
  },
  {
    title: "MongoDB aggregation pipeline help",
    description:
      "Building complex aggregation queries for analytics. Need someone experienced with MongoDB's aggregation framework.",
    tags: ["MongoDB", "Database", "Backend"],
  },
  {
    title: "UI/UX design system implementation",
    description:
      "Want to create a consistent design system for my app. Need help with component library, tokens, and Tailwind configuration.",
    tags: ["UI/UX", "Tailwind", "Design"],
  },
  {
    title: "Git workflow optimization",
    description:
      "Team is struggling with merge conflicts and branching strategy. Need advice on improving our Git workflow.",
    tags: ["Git", "DevOps", "Team"],
  },
  {
    title: "TypeScript generics deep dive",
    description:
      "Want to understand advanced TypeScript patterns, especially generics and utility types for better type safety.",
    tags: ["TypeScript", "Architecture", "Learning"],
  },
  {
    title: "Next.js SSR vs SSG decision",
    description:
      "Not sure whether to use SSR or SSG for different pages in my app. Need guidance on performance implications.",
    tags: ["Next.js", "Performance", "Architecture"],
  },
  {
    title: "WebSocket real-time chat implementation",
    description:
      "Building a real-time chat feature. Need help with WebSocket implementation, scaling, and message persistence.",
    tags: ["WebSocket", "Real-time", "Backend"],
  },
  {
    title: "React performance optimization",
    description:
      "App is getting slow with large lists. Need help with virtualization, memoization, and other React performance patterns.",
    tags: ["React", "Performance", "Optimization"],
  },
  {
    title: "Authentication flow with JWT",
    description:
      "Implementing JWT-based authentication. Need guidance on refresh tokens, secure storage, and best practices.",
    tags: ["Security", "Backend", "Authentication"],
  },
  {
    title: "Responsive design mobile-first approach",
    description:
      "Want to refactor my app to be mobile-first. Need help with Tailwind breakpoints and component responsiveness.",
    tags: ["UI/UX", "Tailwind", "Mobile"],
  },
  {
    title: "Python FastAPI REST API design",
    description:
      "Building a REST API with FastAPI. Need help with proper endpoint structure, validation, and documentation.",
    tags: ["Python", "Backend", "API"],
  },
  {
    title: "Code review and refactoring session",
    description:
      "Looking for someone to review my codebase and suggest refactoring opportunities for better maintainability.",
    tags: ["Refactoring", "Quality", "Best Practices"],
  },
  {
    title: "Accessibility audit and improvements",
    description:
      "Want to make my app more accessible. Need help with ARIA labels, keyboard navigation, and screen reader support.",
    tags: ["Accessibility", "UI/UX", "Quality"],
  },
];

export function generateUser(): DemoUser {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    avatar: faker.helpers.arrayElement([
      "👨‍💻",
      "👩‍💻",
      "🧑‍💻",
      "👨‍🔧",
      "👩‍🔬",
      "🧑‍🎨",
      "👨‍🏫",
      "👩‍💼",
    ]),
    rating: faker.number.float({ min: 4.0, max: 5.0, fractionDigits: 1 }),
    sessionsCompleted: faker.number.int({ min: 5, max: 150 }),
    skills: faker.helpers.arrayElements(
      SKILLS,
      faker.number.int({ min: 2, max: 5 })
    ),
  };
}

export function generateRequest(): DemoRequest {
  const template = faker.helpers.arrayElement(REQUEST_TEMPLATES);
  const urgency = faker.helpers.weightedArrayElement([
    { value: "low" as const, weight: 0.3 },
    { value: "normal" as const, weight: 0.5 },
    { value: "critical" as const, weight: 0.2 },
  ]);

  return {
    id: faker.string.uuid(),
    title: template.title,
    description: template.description,
    tags: template.tags,
    urgency,
    mode: faker.helpers.arrayElement(["async", "live"]),
    duration: faker.helpers.arrayElement([1, 2, 3, 4]),
    budget: faker.datatype.boolean()
      ? {
          amount: faker.number.int({ min: 30, max: 150 }),
          currency: "USD",
        }
      : undefined,
    createdAt: faker.date.recent({ days: 1 }),
    status: "open",
    requester: generateUser(),
    offers: [],
  };
}

export function generateOffer(requestId: string): DemoOffer {
  const messages = [
    "I can help with this in the next few hours. I have 5+ years of experience with this stack.",
    "Available now! I've solved similar problems before and can guide you through the solution.",
    "I'd love to help. I can hop on a call in about 2 hours if that works for you.",
    "This looks interesting! I have experience with exactly this issue. Let me know when you're available.",
    "I can assist with this. I've done similar implementations and know the common pitfalls to avoid.",
  ];

  return {
    id: faker.string.uuid(),
    requestId,
    helper: generateUser(),
    message: faker.helpers.arrayElement(messages),
    availability: faker.helpers.arrayElement([
      "Available now",
      "In 2 hours",
      "Tomorrow morning",
      "This evening",
      "In 30 minutes",
    ]),
    createdAt: faker.date.recent({ days: 0.5 }),
    status: "pending",
  };
}
