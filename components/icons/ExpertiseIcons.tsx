"use client";

import { motion } from "framer-motion";

/**
 * Expertise SVG Icon Components with Brand Gradients
 * Each icon matches the category gradient from CategoryHighlights.tsx
 */

interface IconProps {
  size?: number;
  className?: string;
}

// Frontend: Pink → Orange
export function FrontendIcon({ size = 64, className = "" }: IconProps) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      className={className}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.5 }}
    >
      <defs>
        <linearGradient id="frontend-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#F97316" />
        </linearGradient>
      </defs>
      {/* Browser window frame */}
      <rect
        x="2"
        y="3"
        width="20"
        height="16"
        rx="2"
        stroke="url(#frontend-gradient)"
        strokeWidth="1.5"
        fill="url(#frontend-gradient)"
        fillOpacity="0.05"
      />
      {/* Browser top bar */}
      <line
        x1="2"
        y1="7"
        x2="22"
        y2="7"
        stroke="url(#frontend-gradient)"
        strokeWidth="1.5"
      />
      {/* Browser dots/controls */}
      <motion.circle
        cx="5"
        cy="5"
        r="0.7"
        fill="url(#frontend-gradient)"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0 }}
      />
      <motion.circle
        cx="7.5"
        cy="5"
        r="0.7"
        fill="url(#frontend-gradient)"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
      />
      <motion.circle
        cx="10"
        cy="5"
        r="0.7"
        fill="url(#frontend-gradient)"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
      />
      {/* Layout grid/components */}
      <motion.rect
        x="5"
        y="10"
        width="6"
        height="3"
        rx="0.5"
        fill="url(#frontend-gradient)"
        opacity="0.6"
        animate={{
          opacity: [0.4, 0.7, 0.4]
        }}
        transition={{ duration: 2, repeat: Infinity, delay: 0 }}
      />
      <motion.rect
        x="13"
        y="10"
        width="6"
        height="3"
        rx="0.5"
        fill="url(#frontend-gradient)"
        opacity="0.4"
        animate={{
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      />
      <motion.rect
        x="5"
        y="14.5"
        width="14"
        height="2"
        rx="0.5"
        fill="url(#frontend-gradient)"
        opacity="0.3"
        animate={{
          width: [14, 16, 14],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      />
      {/* Cursor pointer */}
      <motion.path
        d="M15 13l2 2-1 1 1.5 2-1 1-1.5-2-1 1-1-4 1-1z"
        fill="url(#frontend-gradient)"
        opacity="0.8"
        animate={{
          x: [0, 2, 0],
          y: [0, -1, 0],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.svg>
  );
}

// Backend: Indigo → Pink
export function BackendIcon({ size = 64, className = "" }: IconProps) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      className={className}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.5 }}
    >
      <defs>
        <linearGradient id="backend-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
      </defs>
      {/* Server rack container */}
      <rect
        x="4"
        y="3"
        width="16"
        height="18"
        rx="1.5"
        stroke="url(#backend-gradient)"
        strokeWidth="1.5"
        fill="url(#backend-gradient)"
        fillOpacity="0.05"
      />
      {/* Server sections dividers */}
      <line
        x1="4"
        y1="8"
        x2="20"
        y2="8"
        stroke="url(#backend-gradient)"
        strokeWidth="1"
        opacity="0.5"
      />
      <line
        x1="4"
        y1="13"
        x2="20"
        y2="13"
        stroke="url(#backend-gradient)"
        strokeWidth="1"
        opacity="0.5"
      />
      {/* Code brackets in center section */}
      <path
        d="M9.5 10.5L8 12l1.5 1.5"
        stroke="url(#backend-gradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.5 10.5L16 12l-1.5 1.5"
        stroke="url(#backend-gradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <motion.line
        x1="12.5"
        y1="10"
        x2="11.5"
        y2="14"
        stroke="url(#backend-gradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      {/* Status indicators top section */}
      <motion.circle
        cx="7"
        cy="5.5"
        r="0.8"
        fill="url(#backend-gradient)"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
      />
      <motion.circle
        cx="10"
        cy="5.5"
        r="0.8"
        fill="url(#backend-gradient)"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
      />
      <motion.circle
        cx="13"
        cy="5.5"
        r="0.8"
        fill="url(#backend-gradient)"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
      />
      {/* Data flow indicators bottom section */}
      <motion.rect
        x="6"
        y="15.5"
        width="3"
        height="1"
        rx="0.5"
        fill="url(#backend-gradient)"
        animate={{
          width: [3, 7, 3],
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{ duration: 2, repeat: Infinity, delay: 0 }}
      />
      <motion.rect
        x="6"
        y="17.5"
        width="5"
        height="1"
        rx="0.5"
        fill="url(#backend-gradient)"
        animate={{
          width: [5, 9, 5],
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      />
      <motion.rect
        x="6"
        y="19.5"
        width="4"
        height="1"
        rx="0.5"
        fill="url(#backend-gradient)"
        animate={{
          width: [4, 8, 4],
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      />
    </motion.svg>
  );
}

// DevOps: Emerald → Sky
export function DevOpsIcon({ size = 64, className = "" }: IconProps) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      className={className}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.5 }}
    >
      <defs>
        <linearGradient id="devops-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      <motion.circle
        cx="12"
        cy="12"
        r="8"
        stroke="url(#devops-gradient)"
        strokeWidth="1.5"
        fill="none"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      <motion.path
        d="M12 4v4M12 16v4M4 12h4M16 12h4"
        stroke="url(#devops-gradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        animate={{ rotate: -360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "center" }}
      />
      <circle
        cx="12"
        cy="12"
        r="3"
        fill="url(#devops-gradient)"
        opacity="0.6"
      />
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "center" }}
      >
        <circle
          cx="12"
          cy="6"
          r="1.5"
          fill="url(#devops-gradient)"
        />
        <circle
          cx="12"
          cy="18"
          r="1.5"
          fill="url(#devops-gradient)"
        />
        <circle
          cx="6"
          cy="12"
          r="1.5"
          fill="url(#devops-gradient)"
        />
        <circle
          cx="18"
          cy="12"
          r="1.5"
          fill="url(#devops-gradient)"
        />
      </motion.g>
    </motion.svg>
  );
}

// Mobile: Sky → Indigo
export function MobileIcon({ size = 64, className = "" }: IconProps) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      className={className}
      whileHover={{ scale: 1.1, y: [-2, 2, -2] }}
      transition={{ duration: 0.5 }}
    >
      <defs>
        <linearGradient id="mobile-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>
      </defs>
      {/* Phone frame */}
      <rect
        x="6"
        y="2"
        width="12"
        height="20"
        rx="2"
        stroke="url(#mobile-gradient)"
        strokeWidth="1.5"
        fill="url(#mobile-gradient)"
        fillOpacity="0.05"
      />
      {/* Top bar (notch area) */}
      <line
        x1="6"
        y1="5"
        x2="18"
        y2="5"
        stroke="url(#mobile-gradient)"
        strokeWidth="1.5"
      />
      {/* Bottom bar (home indicator area) */}
      <line
        x1="6"
        y1="19"
        x2="18"
        y2="19"
        stroke="url(#mobile-gradient)"
        strokeWidth="1.5"
      />
      {/* Screen content with app grid */}
      <motion.rect
        x="8"
        y="7"
        width="3"
        height="3"
        rx="0.5"
        fill="url(#mobile-gradient)"
        opacity="0.5"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0 }}
      />
      <motion.rect
        x="12.5"
        y="7"
        width="3"
        height="3"
        rx="0.5"
        fill="url(#mobile-gradient)"
        opacity="0.4"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
      />
      <motion.rect
        x="8"
        y="11.5"
        width="3"
        height="3"
        rx="0.5"
        fill="url(#mobile-gradient)"
        opacity="0.4"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
      />
      <motion.rect
        x="12.5"
        y="11.5"
        width="3"
        height="3"
        rx="0.5"
        fill="url(#mobile-gradient)"
        opacity="0.5"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.9 }}
      />
      {/* Notification badge */}
      <motion.circle
        cx="15"
        cy="7.5"
        r="0.8"
        fill="url(#mobile-gradient)"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      {/* Home button/indicator */}
      <motion.rect
        x="10"
        y="20"
        width="4"
        height="1"
        rx="0.5"
        fill="url(#mobile-gradient)"
        animate={{
          width: [4, 5, 4],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      {/* Signal/wifi indicators */}
      <motion.line
        x1="8"
        y1="3.5"
        x2="9"
        y2="3.5"
        stroke="url(#mobile-gradient)"
        strokeWidth="1"
        strokeLinecap="round"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
      />
      <motion.line
        x1="10"
        y1="3.5"
        x2="11"
        y2="3.5"
        stroke="url(#mobile-gradient)"
        strokeWidth="1"
        strokeLinecap="round"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
      />
      <motion.line
        x1="12"
        y1="3.5"
        x2="13"
        y2="3.5"
        stroke="url(#mobile-gradient)"
        strokeWidth="1"
        strokeLinecap="round"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
      />
    </motion.svg>
  );
}

// Testing: Orange → Pink
export function TestingIcon({ size = 64, className = "" }: IconProps) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      className={className}
      whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 0] }}
      transition={{ duration: 0.5 }}
    >
      <defs>
        <linearGradient id="testing-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
      </defs>
      {/* Lab beaker/flask body */}
      <path
        d="M8 3h8v5l3 9c0 2.2-1.8 4-4 4H9c-2.2 0-4-1.8-4-4l3-9V3z"
        stroke="url(#testing-gradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="url(#testing-gradient)"
        fillOpacity="0.1"
      />
      {/* Top rim */}
      <line
        x1="8"
        y1="3"
        x2="16"
        y2="3"
        stroke="url(#testing-gradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Liquid level with wave animation */}
      <motion.path
        d="M7 14c1.5,-0.5 3,-0.5 5,0 1.5,0.5 3.5,0.5 5,0v3c0,1.1 -0.9,2 -2,2H9c-1.1,0 -2,-0.9 -2,-2v-3z"
        fill="url(#testing-gradient)"
        fillOpacity="0.4"
        animate={{
          d: [
            "M7 14c1.5,-0.5 3,-0.5 5,0 1.5,0.5 3.5,0.5 5,0v3c0,1.1 -0.9,2 -2,2H9c-1.1,0 -2,-0.9 -2,-2v-3z",
            "M7 14.5c1.5,0.5 3,0.5 5,0 1.5,-0.5 3.5,-0.5 5,0v2.5c0,1.1 -0.9,2 -2,2H9c-1.1,0 -2,-0.9 -2,-2v-2.5z",
            "M7 14c1.5,-0.5 3,-0.5 5,0 1.5,0.5 3.5,0.5 5,0v3c0,1.1 -0.9,2 -2,2H9c-1.1,0 -2,-0.9 -2,-2v-3z"
          ]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Bubbles rising */}
      <motion.circle
        cx="10"
        cy="13"
        r="0.8"
        fill="url(#testing-gradient)"
        opacity="0.7"
        animate={{
          cy: [16, 10],
          opacity: [0.7, 0],
          scale: [0.8, 1.2]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: 0
        }}
      />
      <motion.circle
        cx="14"
        cy="15"
        r="0.6"
        fill="url(#testing-gradient)"
        opacity="0.7"
        animate={{
          cy: [17, 11],
          opacity: [0.7, 0],
          scale: [0.6, 1]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          delay: 0.5
        }}
      />
      <motion.circle
        cx="12"
        cy="16"
        r="0.7"
        fill="url(#testing-gradient)"
        opacity="0.7"
        animate={{
          cy: [18, 12],
          opacity: [0.7, 0],
          scale: [0.7, 1.1]
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          delay: 1
        }}
      />
      {/* Measurement marks */}
      <line
        x1="7.5"
        y1="10"
        x2="9"
        y2="10"
        stroke="url(#testing-gradient)"
        strokeWidth="1"
        opacity="0.5"
      />
      <line
        x1="15"
        y1="10"
        x2="16.5"
        y2="10"
        stroke="url(#testing-gradient)"
        strokeWidth="1"
        opacity="0.5"
      />
    </motion.svg>
  );
}

// Architecture: Pink → Indigo
export function ArchitectureIcon({ size = 64, className = "" }: IconProps) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      className={className}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.5 }}
    >
      <defs>
        <linearGradient id="architecture-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>
      </defs>
      {/* Central cloud circle */}
      <circle
        cx="12"
        cy="12"
        r="6"
        stroke="url(#architecture-gradient)"
        strokeWidth="1"
        fill="url(#architecture-gradient)"
        fillOpacity="0.1"
      />
      {/* Satellite nodes */}
      <motion.circle
        cx="5"
        cy="7"
        r="1.5"
        fill="url(#architecture-gradient)"
        opacity="0.8"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0 }}
      />
      <motion.circle
        cx="19"
        cy="7"
        r="1.5"
        fill="url(#architecture-gradient)"
        opacity="0.8"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
      />
      <motion.circle
        cx="19"
        cy="17"
        r="1.5"
        fill="url(#architecture-gradient)"
        opacity="0.8"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
      />
      <motion.circle
        cx="5"
        cy="17"
        r="1.5"
        fill="url(#architecture-gradient)"
        opacity="0.8"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.9 }}
      />
      {/* Connection lines */}
      <motion.line
        x1="7"
        y1="9"
        x2="10"
        y2="11"
        stroke="url(#architecture-gradient)"
        strokeWidth="0.8"
        strokeDasharray="2,2"
        animate={{ pathLength: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.line
        x1="17"
        y1="9"
        x2="14"
        y2="11"
        stroke="url(#architecture-gradient)"
        strokeWidth="0.8"
        strokeDasharray="2,2"
        animate={{ pathLength: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      />
      <motion.line
        x1="17"
        y1="15"
        x2="14"
        y2="13"
        stroke="url(#architecture-gradient)"
        strokeWidth="0.8"
        strokeDasharray="2,2"
        animate={{ pathLength: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      />
      <motion.line
        x1="7"
        y1="15"
        x2="10"
        y2="13"
        stroke="url(#architecture-gradient)"
        strokeWidth="0.8"
        strokeDasharray="2,2"
        animate={{ pathLength: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
      />
      {/* Center data flow indicator */}
      <motion.circle
        cx="12"
        cy="12"
        r="2"
        fill="url(#architecture-gradient)"
        opacity="0.6"
        animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0.3, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.svg>
  );
}
