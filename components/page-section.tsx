import { cn } from "@/lib/style";

type Props = {
  className?: string;
  children: React.ReactNode;
  title: string;
  control?: React.ReactNode;
};

export function PageSection({ className, children, title, control }: Props) {
  return (
    <section className={cn("flex flex-col gap-1.5", className)}>
      {control ? (
        <div className="flex w-full items-end">
          <h2 className="text-base">{title}</h2>
          <div className="ml-auto">{control}</div>
        </div>
      ) : (
        <h2 className="text-base">{title}</h2>
      )}
      {children}
    </section>
  );
}
