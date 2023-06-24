import { memo } from "react";
import equal from "react-fast-compare";

type Props = {
  list: React.ReactNode[];
};

function RawControlMenu({ list }: Props) {
  return (
    <menu className="flex gap-2">
      {list.map((control, i) => (
        // re-render does not change the order
        // eslint-disable-next-line react/no-array-index-key
        <li key={i}>{control}</li>
      ))}
    </menu>
  );
}

export const ControlMenu = memo(RawControlMenu, equal);
