import { memo } from "react";
import equal from "fast-deep-equal";

type Props = {
  list: React.ReactNode[];
};

function RawConfigurations({ list }: Props) {
  return (
    <ul className="space-y-1.5">
      {list.map((config, i) => (
        // re-render does not change the order
        // eslint-disable-next-line react/no-array-index-key
        <li key={i}>{config}</li>
      ))}
    </ul>
  );
}

export const Configurations = memo(RawConfigurations, equal);
