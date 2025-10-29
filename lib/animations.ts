import { Variants } from "framer-motion";

/**
 * Animation Utilities for MicroCollab
 * Based on Motion.dev best practices (2025)
 * - Smooth, performant animations using GPU acceleration
 * - Consistent timing and easing across the app
 * - Accessible animations with reduced motion support
 */

// Easing curves for consistent motion
export const EASINGS = {
  smooth: [0.25, 0.1, 0.25, 1],
  spring: { type: "spring", stiffness: 300, damping: 30 },
  bounce: { type: "spring", stiffness: 400, damping: 10 },
  elastic: { type: "spring", stiffness: 200, damping: 15 },
} as const;

// Duration constants (in seconds)
export const DURATIONS = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  verySlow: 0.8,
} as const;

/**
 * Fade In Up Animation
 * Usage: Element enters from below with fade
 */
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATIONS.normal,
      ease: EASINGS.smooth,
    },
  },
};

/**
 * Fade In Down Animation
 * Usage: Element enters from above with fade
 */
export const fadeInDown: Variants = {
  hidden: {
    opacity: 0,
    y: -40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATIONS.normal,
      ease: EASINGS.smooth,
    },
  },
};

/**
 * Fade In Scale Animation
 * Usage: Element enters with fade and scale (great for cards)
 */
export const fadeInScale: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: DURATIONS.normal,
      ease: EASINGS.smooth,
    },
  },
};

/**
 * Stagger Container Animation
 * Usage: Parent container that staggers child animations
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

/**
 * Stagger Item Animation
 * Usage: Child items within stagger container
 */
export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATIONS.normal,
      ease: EASINGS.smooth,
    },
  },
};

/**
 * Scale on Hover Animation
 * Usage: Interactive elements like buttons, cards
 */
export const scaleOnHover = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: DURATIONS.fast,
      ease: EASINGS.smooth,
    },
  },
  tap: {
    scale: 0.95,
  },
};

/**
 * Glow on Hover Animation
 * Usage: Elements with gradient borders or glow effects
 */
export const glowOnHover: Variants = {
  initial: {
    filter: "brightness(1) blur(0px)",
  },
  hover: {
    filter: "brightness(1.2) blur(1px)",
    transition: {
      duration: DURATIONS.fast,
      ease: EASINGS.smooth,
    },
  },
};

/**
 * Slide In From Left Animation
 * Usage: Navigation, sidebar elements
 */
export const slideInLeft: Variants = {
  hidden: {
    x: -100,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: DURATIONS.normal,
      ease: EASINGS.smooth,
    },
  },
};

/**
 * Slide In From Right Animation
 * Usage: Modal, side panels
 */
export const slideInRight: Variants = {
  hidden: {
    x: 100,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: DURATIONS.normal,
      ease: EASINGS.smooth,
    },
  },
};

/**
 * Rotate and Fade Animation
 * Usage: Icons, logos
 */
export const rotateAndFade: Variants = {
  hidden: {
    opacity: 0,
    rotate: -10,
  },
  visible: {
    opacity: 1,
    rotate: 0,
    transition: {
      duration: DURATIONS.slow,
      ease: EASINGS.smooth,
    },
  },
};

/**
 * Pulse Animation
 * Usage: Status indicators, notifications
 */
export const pulse: Variants = {
  initial: {
    scale: 1,
    opacity: 1,
  },
  animate: {
    scale: [1, 1.2, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

/**
 * Scroll-triggered animation with viewport detection
 * Usage: Elements that animate when they enter viewport
 */
export const scrollReveal = {
  viewport: { once: true, amount: 0.3 },
  initial: "hidden",
  whileInView: "visible",
};

/**
 * Gradient shift animation
 * Usage: Background gradients, text gradients
 */
export const gradientShift: Variants = {
  initial: {
    backgroundPosition: "0% 50%",
  },
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

/**
 * Bounce on Enter Animation
 * Usage: Playful elements, success messages
 */
export const bounceIn: Variants = {
  hidden: {
    scale: 0,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: EASINGS.bounce,
  },
};

/**
 * Float Animation
 * Usage: Decorative elements, ambient effects
 */
export const float: Variants = {
  initial: {
    y: 0,
  },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

/**
 * Parallax Scroll Animation
 * Usage: Multi-depth scroll effects for layered content
 */
export const parallaxScroll = (depth: number = 1) => ({
  initial: { y: 0 },
  animate: { y: 0 },
  transition: {
    type: "spring",
    stiffness: 100 - depth * 20,
    damping: 30,
  },
});

/**
 * Morph Blob Animation
 * Usage: Organic blob shapes that morph continuously
 */
export const morphBlob: Variants = {
  initial: {
    borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
  },
  animate: {
    borderRadius: [
      "60% 40% 30% 70% / 60% 30% 70% 40%",
      "30% 60% 70% 40% / 50% 60% 30% 60%",
      "60% 40% 30% 70% / 60% 30% 70% 40%",
    ],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

/**
 * Connection Pulse Animation
 * Usage: Pulse effect along SVG paths for connection visualization
 */
export const connectionPulse: Variants = {
  initial: {
    pathLength: 0,
    opacity: 0,
  },
  animate: {
    pathLength: [0, 1, 1, 0],
    opacity: [0, 0.6, 0.6, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatDelay: 1,
      ease: "easeInOut",
    },
  },
};

/**
 * Particle Drift Animation
 * Usage: Ambient particle movement with random drift
 */
export const particleDrift = (speed: number = 1) => ({
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: [(Math.random() - 0.5) * 50 * speed, (Math.random() - 0.5) * 50 * speed],
    y: [(Math.random() - 0.5) * 50 * speed, (Math.random() - 0.5) * 50 * speed],
    transition: {
      duration: 20 / speed,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "linear",
    },
  },
});

/**
 * Grid Pulse Animation
 * Usage: Traveling light effect along grid lines
 */
export const gridPulse: Variants = {
  initial: {
    opacity: 0.2,
    scale: 1,
  },
  animate: {
    opacity: [0.2, 0.8, 0.2],
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

/**
 * 3D Rotate Animation
 * Usage: 3D rotation for geometric shapes
 */
export const rotate3D: Variants = {
  initial: {
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
  },
  animate: {
    rotateX: [0, 360],
    rotateY: [0, 180],
    rotateZ: [0, 90],
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

/**
 * Spotlight Animation
 * Usage: Moving spotlight effect across elements
 */
export const spotlight: Variants = {
  initial: {
    backgroundPosition: "0% 50%",
    backgroundSize: "200% 200%",
  },
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: {
      duration: 10,
      repeat: Infinity,
      ease: "linear",
    },
  },
};
