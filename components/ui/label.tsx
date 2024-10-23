"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "@/lib/style";

export const Label = ({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof LabelPrimitive.Root>) => (
  <LabelPrimitive.Root
    className={cn(
      "leading-none",
      "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  />
);
