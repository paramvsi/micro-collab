import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // MicroCollab Brand Guidelines - Core Gradient Colors
        brand: {
          indigo: "#6366F1", // Primary gradient start
          pink: "#EC4899", // Primary gradient middle
          orange: "#F97316", // Primary gradient end
          emerald: "#10B981", // Accent gradient start
          sky: "#3B82F6", // Accent gradient end
        },
        // Neutral Palette from Brand Guidelines
        charcoal: "#0F1115", // Background Dark
        graphite: "#1E1E26", // Surface
        porcelain: "#F9FAFB", // Background Light
        steel: "#9CA3AF", // Text Secondary
        smoky: "#27272A", // Borders
        // Feedback Colors from Brand Guidelines
        success: "#22C55E",
        warning: "#EAB308",
        error: "#F43F5E",
        info: "#38BDF8",
        // Demo-specific colors
        demo: {
          "banner-bg": "rgba(99, 102, 241, 0.05)",
          "card-hover": "rgba(236, 72, 153, 0.1)",
        },
        // Urgency color scale
        urgency: {
          low: "#9CA3AF", // Gray
          normal: "#EAB308", // Amber
          critical: "#F43F5E", // Coral
        },
        // Keep standard Tailwind scale for compatibility
        indigo: {
          50: "#EEF2FF",
          100: "#E0E7FF",
          200: "#C7D2FE",
          300: "#A5B4FC",
          400: "#818CF8",
          500: "#6366F1",
          600: "#4F46E5",
          700: "#4338CA",
          800: "#3730A3",
          900: "#312E81",
        },
        pink: {
          50: "#FDF2F8",
          100: "#FCE7F3",
          200: "#FBCFE8",
          300: "#F9A8D4",
          400: "#F472B6",
          500: "#EC4899",
          600: "#DB2777",
          700: "#BE185D",
          800: "#9D174D",
          900: "#831843",
        },
        orange: {
          50: "#FFF7ED",
          100: "#FFEDD5",
          200: "#FED7AA",
          300: "#FDBA74",
          400: "#FB923C",
          500: "#F97316",
          600: "#EA580C",
          700: "#C2410C",
          800: "#9A3412",
          900: "#7C2D12",
        },
      },
      fontFamily: {
        display: ["Plus Jakarta Sans", "system-ui", "sans-serif"], // Brand: Display headings
        sans: ["Inter", "system-ui", "sans-serif"], // Brand: Body text
        mono: ["IBM Plex Mono", "monospace"], // Brand: Code/technical
      },
      backgroundImage: {
        "gradient-primary":
          "linear-gradient(135deg, #6366F1, #EC4899, #F97316)",
        "gradient-accent": "linear-gradient(135deg, #10B981, #3B82F6)",
        "gradient-card":
          "linear-gradient(135deg, rgba(99,102,241,0.05), rgba(236,72,153,0.05))",
      },
      boxShadow: {
        "glow-indigo": "0 0 24px rgba(99, 102, 241, 0.3)",
        "glow-pink": "0 0 24px rgba(236, 72, 153, 0.3)",
        "glow-emerald": "0 0 24px rgba(16, 185, 129, 0.3)",
        "card-hover": "0 8px 32px rgba(99, 102, 241, 0.15)",
      },
      borderRadius: {
        base: "0.75rem", // Brand: --radius-base
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "slide-in": "slideIn 0.3s ease-out",
        "fade-in": "fadeIn 0.2s ease-in",
        "slide-up": "slideUp 0.3s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};

export default config;
