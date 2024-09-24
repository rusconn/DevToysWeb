import * as React from "react";
import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/style";

export const buttonVariants = cva(
  "transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: cn(
          "bg-neutral-50 text-neutral-750",
          "hover:bg-neutral-100",
          "dark:bg-neutral-750 dark:text-neutral-200",
          "dark:hover:bg-neutral-700"
        ),
        secondary: cn(
          "bg-sky-700 text-neutral-150",
          "hover:bg-sky-600",
          "dark:bg-indigo-300 dark:text-neutral-850",
          "dark:hover:bg-indigo-400"
        ),
        ghost: cn(
          "hover:bg-neutral-200", //
          "dark:hover:bg-neutral-750"
        ),
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
