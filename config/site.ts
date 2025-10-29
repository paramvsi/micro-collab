/**
 * Site configuration
 */

export const siteConfig = {
  name: "MicroCollab",
  description:
    "Connect with experienced developers for short, focused help sessions (1-4 hours). Get help with debugging, refactoring, testing, and architectural guidance.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3003",
  ogImage: "/og-image.png",
  links: {
    github: "https://github.com/yourusername/microcollab",
  },
  creator: {
    name: "Your Name",
    url: "https://yourwebsite.com",
  },
};

export type SiteConfig = typeof siteConfig;
