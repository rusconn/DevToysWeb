import { ToolCard, ToolCardProps } from "@/components/tool-card";

type Props = {
  tools: readonly ToolCardProps[];
};

export function ToolCards({ tools }: Props) {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-8">
      {tools.map(tool => (
        <li key={tool.href}>
          <ToolCard {...tool} />
        </li>
      ))}
    </ul>
  );
}
