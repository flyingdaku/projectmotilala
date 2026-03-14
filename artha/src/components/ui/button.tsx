import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-hover)] shadow-sm",
        destructive:
          "bg-[var(--bear-tint)] text-[var(--bear-strong)] hover:opacity-90 shadow-sm",
        outline:
          "border border-[var(--border)] bg-transparent hover:bg-[var(--surface-hover)] hover:border-[var(--brand-primary)] text-[var(--text-primary)]",
        selected:
          "border border-[var(--selection-border)] bg-[var(--selection-bg)] text-[var(--selection-text)] hover:bg-[var(--selection-bg-hover)] shadow-[var(--selection-shadow)]",
        secondary:
          "bg-[var(--brand-tint)] text-[var(--brand-primary)] hover:opacity-90",
        ghost: "hover:bg-[var(--bg-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
        link: "text-[var(--brand-primary)] underline-offset-4 hover:text-[var(--brand-hover)] hover:underline",
      },
      size: {
        default: "h-[var(--control-height)] px-4 py-2",
        sm: "h-[var(--control-height-sm)] rounded-lg px-3 text-xs",
        lg: "h-[calc(var(--control-height)+0.25rem)] rounded-lg px-8",
        icon: "h-[var(--control-height)] w-[var(--control-height)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
