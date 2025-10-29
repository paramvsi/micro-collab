"use client";

import { motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";

/**
 * ConnectionNetwork Component
 *
 * Animated network of nodes connected by lines, representing collaboration.
 * Nodes pulse with brand gradient colors, connections form/break dynamically.
 * Primary visual metaphor for MicroCollab's collaborative nature.
 */

interface Node {
  id: number;
  x: number;
  y: number;
  color: string;
  delay: number;
  size: number;
}

interface ConnectionNetworkProps {
  className?: string;
  nodeCount?: number;
}

export function ConnectionNetwork({
  className = "",
  nodeCount = 12,
}: ConnectionNetworkProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { nodes, connections } = useMemo(() => {
    const brandColors = ["#6366F1", "#EC4899", "#F97316", "#10B981", "#3B82F6"];

    // Generate deterministic node positions (pseudo-random but consistent)
    const generatedNodes: Node[] = Array.from({ length: nodeCount }, (_, i) => ({
      id: i,
      x: ((i * 73 + 17) % 100), // Deterministic pseudo-random
      y: ((i * 47 + 31) % 100), // Deterministic pseudo-random
      color: brandColors[i % brandColors.length],
      delay: (i * 0.3) % 2, // Deterministic delay
      size: 8 + ((i * 5) % 8), // 8-16px deterministic
    }));

    // Generate connections between nearby nodes
    const maxDistance = 30; // Maximum distance percentage for connections
    const generatedConnections: Array<{ from: Node; to: Node; distance: number }> = [];

    for (let i = 0; i < generatedNodes.length; i++) {
      for (let j = i + 1; j < generatedNodes.length; j++) {
        const dx = generatedNodes[i].x - generatedNodes[j].x;
        const dy = generatedNodes[i].y - generatedNodes[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          generatedConnections.push({
            from: generatedNodes[i],
            to: generatedNodes[j],
            distance,
          });
        }
      }
    }

    return { nodes: generatedNodes, connections: generatedConnections };
  }, [nodeCount]);

  // Don't render animations during SSR
  if (!mounted) {
    return null;
  }

  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Define gradients for connections */}
      <defs>
        <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366F1" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#EC4899" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#F97316" stopOpacity="0.1" />
        </linearGradient>

        {/* Glow filter for nodes */}
        <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Render connections */}
      <g className="connections">
        {connections.map(({ from, to, distance }, index) => (
          <motion.line
            key={`connection-${from.id}-${to.id}`}
            x1={`${from.x}%`}
            y1={`${from.y}%`}
            x2={`${to.x}%`}
            y2={`${to.y}%`}
            stroke="url(#connectionGradient)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 1, 0],
              opacity: [0, 0.6, 0.6, 0],
            }}
            transition={{
              duration: 4,
              delay: index * 0.1,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </g>

      {/* Render nodes */}
      <g className="nodes">
        {nodes.map((node) => (
          <g key={node.id}>
            {/* Outer pulse ring */}
            <motion.circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r={node.size}
              fill="none"
              stroke={node.color}
              strokeWidth="2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.8, 0, 0.8],
              }}
              transition={{
                duration: 3,
                delay: node.delay,
                repeat: Infinity,
                ease: "easeOut",
              }}
              style={{ transformOrigin: `${node.x}% ${node.y}%` }}
            />

            {/* Core node */}
            <motion.circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r={node.size / 2}
              fill={node.color}
              filter="url(#nodeGlow)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2,
                delay: node.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ transformOrigin: `${node.x}% ${node.y}%` }}
            />
          </g>
        ))}
      </g>
    </svg>
  );
}
