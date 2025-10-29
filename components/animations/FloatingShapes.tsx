"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

/**
 * FloatingShapes Component
 *
 * 3D-transformed geometric shapes with gradient fills and glassmorphism.
 * Slow floating animation with parallax on scroll.
 * Represents building blocks of collaboration in abstract form.
 */

interface Shape {
  id: number;
  type: "cube" | "sphere" | "pyramid";
  x: number;
  y: number;
  size: number;
  rotation: number;
  duration: number;
  gradient: string;
}

interface FloatingShapesProps {
  className?: string;
  shapeCount?: number;
}

export function FloatingShapes({
  className = "",
  shapeCount = 6,
}: FloatingShapesProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const gradients = [
    "linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(236, 72, 153, 0.1))", // Indigo → Pink
    "linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(249, 115, 22, 0.1))", // Pink → Orange
    "linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(59, 130, 246, 0.1))", // Emerald → Blue
    "linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(99, 102, 241, 0.1))", // Blue → Indigo
  ];

  // Use deterministic values for SSR, then replace with random on client
  const shapes: Shape[] = Array.from({ length: shapeCount }, (_, i) => ({
    id: i,
    type: ["cube", "sphere", "pyramid"][i % 3] as Shape["type"],
    x: 10 + (i * 15) % 80,
    y: 10 + (i * 20) % 70,
    size: mounted ? 60 + (((i + 1) * 37) % 80) : 80, // Deterministic for SSR
    rotation: mounted ? ((i + 1) * 73) % 360 : 0, // Deterministic for SSR
    duration: mounted ? 15 + (((i + 1) * 23) % 10) : 20, // Deterministic for SSR
    gradient: gradients[i % gradients.length],
  }));

  // Don't render animations during SSR
  if (!mounted) {
    return null;
  }

  const renderShape = (shape: Shape) => {
    const baseClasses = "absolute rounded-xl backdrop-blur-sm border border-white/10";

    switch (shape.type) {
      case "cube":
        return (
          <div
            className={baseClasses}
            style={{
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              background: shape.gradient,
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            }}
          />
        );

      case "sphere":
        return (
          <div
            className={baseClasses}
            style={{
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              borderRadius: "50%",
              background: shape.gradient,
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            }}
          />
        );

      case "pyramid":
        return (
          <div
            className={baseClasses}
            style={{
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              background: shape.gradient,
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            }}
          />
        );
    }
  };

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            transformStyle: "preserve-3d",
            perspective: "1000px",
          }}
          initial={{
            opacity: 0,
            scale: 0,
            rotateX: shape.rotation,
            rotateY: shape.rotation,
            rotateZ: shape.rotation,
          }}
          animate={{
            opacity: [0, 0.6, 0.6, 0],
            scale: [0.8, 1, 1, 0.8],
            rotateX: [shape.rotation, shape.rotation + 360],
            rotateY: [shape.rotation, shape.rotation + 180],
            rotateZ: [shape.rotation, shape.rotation + 90],
            y: [-20, 20, -20],
            x: [-10, 10, -10],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.3, 0.7, 1],
          }}
        >
          {renderShape(shape)}
        </motion.div>
      ))}
    </div>
  );
}
