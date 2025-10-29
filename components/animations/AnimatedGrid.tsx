"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * AnimatedGrid Component
 *
 * Creates an animated perspective grid background with traveling gradient pulses.
 * Brand-aligned with MicroCollab gradient colors representing infrastructure/platform.
 */

interface AnimatedGridProps {
  className?: string;
}

export function AnimatedGrid({ className = "" }: AnimatedGridProps) {
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateSize();
    window.addEventListener("resize", updateSize);

    // Grid configuration
    const gridSize = 50;
    const perspective = 500;
    let time = 0;

    // Brand gradient colors
    const gradientColors = {
      primary: ["#6366F1", "#EC4899", "#F97316"],
      alpha: [0.3, 0.2, 0.15],
    };

    // Intersection Observer to pause when off-screen
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    const animate = () => {
      if (!ctx || !canvas) return;

      // Skip rendering if not visible
      if (!isVisible) {
        requestAnimationFrame(animate);
        return;
      }

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Set perspective origin at bottom center
      const centerX = canvas.width / 2;
      const vanishingY = canvas.height * 0.6;

      time += 0.002;

      // Draw horizontal grid lines
      for (let i = 0; i <= 20; i++) {
        const z = i * gridSize;
        const scale = perspective / (perspective + z);
        const y = vanishingY + z * scale * 0.5;

        if (y > canvas.height) continue;

        // Calculate pulse effect (wave traveling along grid)
        const pulseOffset = (time * 200) % 400;
        const distanceToPulse = Math.abs((i * gridSize) - pulseOffset);
        const pulseStrength = Math.max(0, 1 - distanceToPulse / 150);

        // Interpolate gradient color based on pulse
        const colorIndex = Math.floor(pulseStrength * 2);
        const alpha = gradientColors.alpha[Math.min(colorIndex, 2)] * (0.3 + pulseStrength * 0.7);

        // Use RGBA format for proper color animation
        if (colorIndex === 0) {
          ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`; // Indigo
        } else if (colorIndex === 1) {
          ctx.strokeStyle = `rgba(236, 72, 153, ${alpha})`; // Pink
        } else {
          ctx.strokeStyle = `rgba(249, 115, 22, ${alpha})`; // Orange
        }

        ctx.lineWidth = 1 + pulseStrength * 2;

        const leftX = centerX - (canvas.width * scale) / 2;
        const rightX = centerX + (canvas.width * scale) / 2;

        ctx.beginPath();
        ctx.moveTo(leftX, y);
        ctx.lineTo(rightX, y);
        ctx.stroke();
      }

      // Draw vertical grid lines
      for (let i = -10; i <= 10; i++) {
        const x = centerX + i * gridSize;

        ctx.strokeStyle = "rgba(99, 102, 241, 0.15)";
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(x, vanishingY);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", updateSize);
      observer.disconnect();
    };
  }, [mounted]);

  // Don't render during SSR
  if (!mounted) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 opacity-40 ${className}`}
      style={{
        mixBlendMode: "screen",
        willChange: "transform",
      }}
    />
  );
}
