type Props = {
  icon: React.ReactNode;
  title: string;
  description?: string;
  control: React.ReactNode;
};

export function Configuration({ icon, title, description, control }: Props) {
  return (
    <div className="flex h-16 items-center gap-6 rounded border bg-configuration px-4">
      {icon}
      {description ? (
        <div className="flex flex-col">
          <span>{title}</span>
          <span className="text-xs text-muted-foreground">{description}</span>
        </div>
      ) : (
        <span>{title}</span>
      )}
      <div className="flex flex-1 justify-end">{control}</div>
    </div>
  );
}
