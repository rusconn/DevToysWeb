import type { ComponentPropsWithRef } from "react";

import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "rounded-md transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        theme: [
          "inline-flex aspect-square items-center justify-center",
          "hover:bg-neutral-200",
          "dark:hover:bg-neutral-750",
        ],
        search: [
          "hover:bg-neutral-200", //
          "dark:hover:bg-neutral-750",
        ],
        control: [
          "text-neutral-750 inline-flex items-center border bg-neutral-50",
          "hover:bg-neutral-100",
          "dark:bg-neutral-750 dark:text-neutral-200",
          "dark:hover:bg-neutral-700",
        ],
        accent: [
          "text-neutral-150 bg-sky-700",
          "hover:bg-sky-600",
          "dark:text-neutral-850 dark:bg-indigo-300",
          "dark:hover:bg-indigo-400",
        ],
      },
      size: {
        default: "h-9 px-3 py-2",
        taller: "h-10",
        shorter: "h-6",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export type ButtonProps = Omit<ComponentPropsWithRef<"button">, "className"> &
  VariantProps<typeof buttonVariants>;

export const Button = ({ variant, size, ...props }: ButtonProps) => (
  <button className={buttonVariants({ variant, size })} type="button" {...props} />
);
