type Props = {
  list: React.ReactNode[];
};

export function ControlMenu({ list }: Props) {
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
