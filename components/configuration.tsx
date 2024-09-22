import { memo, PropsWithChildren } from "react";
import equal from "react-fast-compare";

function RawConfiguration({ children }: PropsWithChildren) {
  return <ul className="flex flex-col gap-1.5">{children}</ul>;
}

export const Configuration = memo(RawConfiguration, equal);

function RawConfigurationItem({
  icon,
  title,
  description,
  control,
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
  control: React.ReactNode;
}) {
  return (
    <li className="flex h-16 items-center gap-6 rounded border bg-configuration px-4">
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
    </li>
  );
}

export const ConfigurationItem = memo(RawConfigurationItem, equal);
