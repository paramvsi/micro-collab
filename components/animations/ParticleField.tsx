"use client";

import { useEffect, useRef, useState } from "react";

/**
 * ParticleField Component
 *
 * Canvas-based interactive particle system that responds to mouse movement.
 * Particles drift with ambient motion and connect when nearby.
 * Adds "energetic" and "dynamic" feel to the hero section.
 */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
}

interface ParticleFieldProps {
  className?: string;
  particleCount?: number;
}

export function ParticleField({
  className = "",
  particleCount = 80,
}: ParticleFieldProps) {
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);

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

    // Brand gradient colors
    const brandColors = [
      "#6366F1", // Indigo
      "#EC4899", // Pink
      "#F97316", // Orange
      "#10B981", // Emerald
      "#3B82F6", // Blue
    ];

    // Initialize particles with deterministic pseudo-random values
    const initParticles = () => {
      particlesRef.current = Array.from({ length: particleCount }, (_, i) => ({
        x: ((i * 73 + 17) % canvas.width),
        y: ((i * 47 + 31) % canvas.height),
        vx: (((i * 13) % 100) / 100 - 0.5) * 0.5,
        vy: (((i * 19) % 100) / 100 - 0.5) * 0.5,
        size: ((i * 7) % 2) + 1,
        color: brandColors[i % brandColors.length],
        alpha: ((i * 11) % 50) / 100 + 0.3,
      }));
    };
    initParticles();

    // Mouse move handler with throttling for performance
    let lastMouseUpdate = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastMouseUpdate > 16) { // ~60fps throttle
        mouseRef.current = { x: e.clientX, y: e.clientY };
        lastMouseUpdate = now;
      }
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Intersection Observer to pause when off-screen
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    // Animation loop
    let animationId: number;
    const animate = () => {
      if (!ctx || !canvas) return;

      // Skip rendering if not visible
      if (!isVisible) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      particles.forEach((particle, i) => {
        // Update position with ambient drift
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Mouse interaction - particles move away from cursor
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          particle.vx -= (dx / distance) * force * 0.1;
          particle.vy -= (dy / distance) * force * 0.1;
        }

        // Apply friction
        particle.vx *= 0.98;
        particle.vy *= 0.98;

        // Boundary wrapping
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle with glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = particle.color;
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.alpha;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw connections to nearby particles (limit to improve performance)
        // Only check every 3rd particle to reduce calculations
        if (i % 3 === 0) {
          for (let j = i + 1; j < Math.min(i + 10, particles.length); j++) {
            const other = particles[j];
            const dx2 = particle.x - other.x;
            const dy2 = particle.y - other.y;
            const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

            if (distance2 < 100) {
              ctx.strokeStyle = particle.color;
              ctx.globalAlpha = (1 - distance2 / 100) * 0.15;
              ctx.lineWidth = 0.5;

              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(other.x, other.y);
              ctx.stroke();
            }
          }
        }
      });

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", updateSize);
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, [particleCount, mounted]);

  // Don't render during SSR
  if (!mounted) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        mixBlendMode: "screen",
        willChange: "transform",
      }}
    />
  );
}
