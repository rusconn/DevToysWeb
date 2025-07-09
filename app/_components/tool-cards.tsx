import { ToolCard, ToolCardProps } from "./tool-card";

import styles from "./tool-cards.module.css";

type Props = {
  tools: readonly ToolCardProps[];
};

export function ToolCards({ tools }: Props) {
  return (
    <ul className={styles.root}>
      {tools.map(tool => (
        <li key={tool.href}>
          <ToolCard {...tool} />
        </li>
      ))}
    </ul>
  );
}
