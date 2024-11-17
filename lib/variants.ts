import { cva } from "class-variance-authority"

// Container variants
export const containerVariants = cva(
  "mx-auto px-4 sm:px-6 lg:px-8",
  {
    variants: {
      size: {
        default: "max-w-7xl",
        sm: "max-w-3xl",
        lg: "max-w-[1400px]"
      }
    },
    defaultVariants: {
      size: "default"
    }
  }
)

// Section variants
export const sectionVariants = cva(
  "py-12 sm:py-16 lg:py-24",
  {
    variants: {
      background: {
        default: "bg-background",
        muted: "bg-muted",
        gradient: "bg-gradient-to-b from-muted/50 to-background"
      },
      spacing: {
        default: "py-12 sm:py-16 lg:py-24",
        compact: "py-8 sm:py-12",
        none: ""
      }
    },
    defaultVariants: {
      background: "default",
      spacing: "default"
    }
  }
)

// Heading variants
export const headingVariants = cva(
  "font-bold tracking-tighter",
  {
    variants: {
      size: {
        h1: "text-4xl sm:text-5xl lg:text-6xl",
        h2: "text-3xl sm:text-4xl lg:text-5xl",
        h3: "text-2xl sm:text-3xl",
        h4: "text-xl sm:text-2xl",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right"
      }
    },
    defaultVariants: {
      size: "h2",
      align: "left"
    }
  }
)