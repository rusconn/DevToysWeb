import type { ComponentPropsWithRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";

export const inputVariants = cva(
  [
    "h-9 w-full rounded border border-b-neutral-450 bg-neutral-50 py-2 outline-hidden",
    "placeholder:text-neutral-450",
    "hover:bg-neutral-100",
    "focus:border-b-2 focus:border-b-sky-700 focus:bg-neutral-0 focus:pb-[7px]",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "dark:border-b-neutral-400 dark:bg-neutral-750",
    "dark:placeholder:text-neutral-400",
    "dark:hover:bg-neutral-700",
    "dark:focus:border-b-indigo-300 dark:focus:bg-neutral-850",
  ],
  {
    variants: {
      variant: {
        default: "px-3 font-mono",
        search: "pr-16 pl-3",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type InputProps = Omit<ComponentPropsWithRef<"input">, "className"> &
  VariantProps<typeof inputVariants>;

export const Input = ({ variant, ...props }: InputProps) => (
  <input className={inputVariants({ variant })} spellCheck="false" {...props} />
);
