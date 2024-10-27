import { ReactNode } from "react";

import { cn } from "@/_lib/style";

type Props = {
  className?: string;
  children: ReactNode;
  title: string;
  control?: ReactNode;
};

export function PageSection({ className, children, title, control }: Props) {
  return (
    <section className={cn("flex flex-col gap-1.5", className)}>
      {control ? (
        <div className="flex justify-between">
          <h2 className="self-end text-base">{title}</h2>
          <div>{control}</div>
        </div>
      ) : (
        <h2 className="text-base">{title}</h2>
      )}
      {children}
    </section>
  );
}
