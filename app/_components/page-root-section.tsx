import { ReactNode } from "react";

import { cn } from "@/_lib/style";

type Props = {
  className?: string;
  children: ReactNode;
  title: string;
};

export function PageRootSection({ className, children, title }: Props) {
  return (
    <section className={cn("flex flex-col gap-6", className)}>
      <h1 className="text-2xl">{title}</h1>
      {children}
    </section>
  );
}
