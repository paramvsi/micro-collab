import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const cardVariants = cva(
  "rounded-xl border text-card-foreground transition-all duration-300",
  {
    variants: {
      variant: {
        default:
          "bg-card border-white/10 shadow-sm",
        // Glass morphism with backdrop blur
        glass:
          "bg-white/5 backdrop-blur-md border-white/10 shadow-lg hover:bg-white/8 hover:border-white/20",
        // Surface with indigo glow
        surface:
          "bg-surface border-white/5 shadow-[0_0_12px_rgba(99,102,241,0.15)] hover:shadow-[0_0_18px_rgba(236,72,153,0.35)] hover:border-brand-pink/30",
        // Interactive card with scale and glow
        interactive:
          "bg-surface border-white/5 cursor-pointer shadow-sm hover:shadow-[0_0_24px_rgba(236,72,153,0.3)] hover:scale-[1.02] hover:border-brand-pink/50 active:scale-[0.98]",
        // Gradient border variant
        "gradient-border":
          "bg-surface relative overflow-hidden before:absolute before:inset-0 before:p-[1px] before:rounded-xl before:bg-gradient-to-r before:from-brand-indigo before:via-brand-pink before:to-brand-orange before:content-[''] before:-z-10 hover:before:opacity-100 before:opacity-0 before:transition-opacity",
        // Outline with no background
        outline:
          "bg-transparent border-white/20 hover:border-brand-emerald/50 hover:bg-white/5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant }), className)}
      {...props}
    />
  )
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-display text-xl font-bold leading-none tracking-tight text-white", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-steel leading-relaxed", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
