type Props = {
  className?: string;
  children: React.ReactNode;
  title: string;
};

export function PageRootSection({ className, children, title }: Props) {
  return (
    <section {...{ className }}>
      <h1 className="mb-6 text-2xl">{title}</h1>
      {children}
    </section>
  );
}
