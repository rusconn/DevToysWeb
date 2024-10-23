import * as React from "react";
import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/style";

export const buttonVariants = cva(
  "transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-hover",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-hover",
        ghost: "hover:bg-accent",
      },
      size: {
        default: "h-9 rounded-md px-3 py-2",
        taller: "h-10 rounded-md",
        shorter: "h-6 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type ButtonProps = React.ComponentPropsWithRef<"button"> &
  VariantProps<typeof buttonVariants>;

export const Button = ({ className, variant, size, ...props }: ButtonProps) => (
  <button className={cn(buttonVariants({ variant, size }), className)} type="button" {...props} />
);
Button.displayName = "Button";
