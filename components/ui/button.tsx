import * as React from "react";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/style";

export const buttonVariants = cva(
  "inline-flex items-center justify-center transition-colors disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-hover",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-hover",
        ghost: "hover:bg-accent",
      },
      size: {
        default: "h-9 rounded-md py-2 px-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      {...{ ref }}
      className={cn(buttonVariants({ variant, size }), className)}
      type="button"
      {...props}
    />
  )
);
Button.displayName = "Button";
