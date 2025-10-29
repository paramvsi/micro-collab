import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-emerald focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        // Brand gradient badge
        gradient:
          "border-transparent bg-gradient-to-r from-brand-indigo via-brand-pink to-brand-orange text-white shadow-lg hover:shadow-[0_0_16px_rgba(236,72,153,0.4)]",
        // Accent gradient badge
        "gradient-accent":
          "border-transparent bg-gradient-to-r from-brand-emerald to-brand-sky text-white shadow-md hover:shadow-[0_0_12px_rgba(16,185,129,0.3)]",
        // Glass morphism
        glass:
          "border-white/10 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 hover:border-white/20",
        // Success (Emerald)
        success:
          "border-transparent bg-success/20 text-emerald-400 hover:bg-success/30",
        // Warning (Yellow)
        warning:
          "border-transparent bg-warning/20 text-warning hover:bg-warning/30",
        // Error (Red)
        error:
          "border-transparent bg-error/20 text-error hover:bg-error/30",
        // Info (Sky Blue)
        info:
          "border-transparent bg-info/20 text-info hover:bg-info/30",
        // Outline with glow
        outline:
          "border-white/30 bg-transparent text-white hover:border-brand-emerald/50 hover:bg-brand-emerald/10 hover:text-brand-emerald",
        // Secondary surface
        secondary:
          "border-white/5 bg-surface text-steel hover:bg-surface/80 hover:text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
