import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border border-transparent px-2.5 py-1 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-[var(--brand-focus)] focus-visible:ring-2 focus-visible:ring-[var(--brand-focus)] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow,background-color,border-color] overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-[var(--brand-tint)] text-[var(--brand-primary)] border-[var(--brand-primary)] [a&]:hover:opacity-90",
        secondary:
          "bg-[var(--bg-hover)] text-[var(--text-secondary)] border-[var(--border)] [a&]:hover:bg-[var(--surface-hover)]",
        destructive:
          "bg-[var(--bear-tint)] text-[var(--bear-strong)] border-[var(--bear-strong)] [a&]:hover:opacity-90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline:
          "border-[var(--border)] text-[var(--text-primary)] [a&]:hover:bg-[var(--surface-hover)] [a&]:hover:text-[var(--text-primary)]",
        ghost: "text-[var(--text-secondary)] [a&]:hover:bg-[var(--bg-hover)] [a&]:hover:text-[var(--text-primary)]",
        link: "text-[var(--brand-primary)] underline-offset-4 [a&]:hover:text-[var(--brand-hover)] [a&]:hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
