import { cn } from "@/lib/style";

type Props = {
  className?: string;
  children: React.ReactNode;
  title?: string;
  control?: React.ReactNode;
};

export function PageSection({ className, children, title, control }: Props) {
  return (
    <section className={cn("mt-3 flex flex-col", className)}>
      {title &&
        (control ? (
          <div className="mb-1.5 flex w-full items-end">
            <h2 className="text-base">{title}</h2>
            <div className="ml-auto">{control}</div>
          </div>
        ) : (
          <h2 className="mb-1.5 text-base">{title}</h2>
        ))}
      {children}
    </section>
  );
}
