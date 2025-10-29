import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-emerald focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        // Brand Gradient - Primary (Indigo → Pink → Orange)
        gradient:
          "bg-gradient-to-r from-brand-indigo via-brand-pink to-brand-orange text-white shadow-lg hover:shadow-[0_0_24px_rgba(236,72,153,0.5)] hover:scale-105 active:scale-95",
        // Brand Gradient - Accent (Emerald → Sky Blue)
        "gradient-accent":
          "bg-gradient-to-r from-brand-emerald to-brand-sky text-white shadow-lg hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:scale-105 active:scale-95",
        // Outline with Emerald Glow
        outline:
          "border-2 border-white/20 bg-transparent text-white shadow-sm hover:border-brand-emerald hover:bg-brand-emerald/10 hover:shadow-[0_0_16px_rgba(16,185,129,0.3)]",
        // Ghost with subtle hover
        ghost:
          "text-white hover:bg-white/10 hover:text-brand-emerald",
        // Glass morphism variant
        glass:
          "bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 hover:border-brand-pink/50 hover:shadow-[0_0_18px_rgba(236,72,153,0.3)]",
        destructive:
          "bg-error text-white shadow-sm hover:bg-error/90 hover:shadow-[0_0_16px_rgba(244,63,94,0.4)]",
        secondary:
          "bg-surface text-white shadow-sm hover:bg-surface/80 hover:shadow-[0_0_12px_rgba(99,102,241,0.2)]",
        link:
          "text-brand-emerald underline-offset-4 hover:underline hover:text-brand-sky",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 rounded-md px-4 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        xl: "h-14 rounded-lg px-10 text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
