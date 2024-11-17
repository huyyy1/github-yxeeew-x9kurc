import { cn } from "@/lib/utils"
import { containerVariants } from "@/lib/variants"
import { type VariantProps } from "class-variance-authority"

interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

export function Container({
  className,
  size,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(containerVariants({ size }), className)}
      {...props}
    />
  )
}