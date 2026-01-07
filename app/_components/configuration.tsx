import type { PropsWithChildren, ReactNode } from "react";

import { cn } from "../_lib/style";

export function Configuration({ children }: PropsWithChildren) {
  return <ul className="flex flex-col gap-1.5">{children}</ul>;
}

export type ConfigurationItemProps = {
  icon: ReactNode;
  title: string;
  control: ReactNode;
};

export function ConfigurationItem({ icon, title, control }: ConfigurationItemProps) {
  return (
    <Item>
      {icon}
      <Title title={title} />
      <Control control={control} />
    </Item>
  );
}

export type ConfigurationItemWithDescriptionProps = ConfigurationItemProps & {
  description: string;
};

export function ConfigurationItemWithDesciption({
  icon,
  title,
  description,
  control,
}: ConfigurationItemWithDescriptionProps) {
  return (
    <Item>
      {icon}
      <div className="flex flex-col">
        <Title title={title} />
        <span
          className={cn(
            "text-neutral-450 text-xs", //
            "dark:text-neutral-400",
          )}
        >
          {description}
        </span>
      </div>
      <Control control={control} />
    </Item>
  );
}

function Item({ children }: PropsWithChildren) {
  return (
    <li
      className={cn(
        "flex h-16 items-center gap-6 rounded border bg-neutral-50 px-4",
        "dark:bg-neutral-750",
      )}
    >
      {children}
    </li>
  );
}

function Title({ title }: Pick<ConfigurationItemProps, "title">) {
  return <span>{title}</span>;
}

function Control({ control }: Pick<ConfigurationItemProps, "control">) {
  return <div className="flex flex-1 justify-end">{control}</div>;
}
