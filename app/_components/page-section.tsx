import type { PropsWithChildren, ReactNode } from "react";

import { cn } from "../_lib/style";

type PageSectionProps = PropsWithChildren<{
  className?: string;
  title: string;
}>;

export function PageSection({ children, className, title }: PageSectionProps) {
  return (
    <Section className={className}>
      <h2 className="text-base">{title}</h2>
      {children}
    </Section>
  );
}

type PageSectionWithControlProps = PageSectionProps & {
  control: ReactNode;
};

// I think controls should be bound to io components,
// but for now I'm prioritizing implementation simplicity
export function PageSectionWithControl({
  children,
  className,
  title,
  control,
}: PageSectionWithControlProps) {
  return (
    <Section className={className}>
      <div className="flex justify-between">
        <h2 className="self-end text-base">{title}</h2>
        <div>{control}</div>
      </div>
      {children}
    </Section>
  );
}

function Section({ children, className }: Pick<PageSectionProps, "children" | "className">) {
  return <section className={cn("flex flex-col gap-1.5", className)}>{children}</section>;
}
