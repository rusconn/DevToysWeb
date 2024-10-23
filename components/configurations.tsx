type Props = {
  list: React.ReactNode[];
};

export function Configurations({ list }: Props) {
  return (
    <ul className="flex flex-col gap-1.5">
      {list.map((config, i) => (
        // re-render does not change the order
        // eslint-disable-next-line react/no-array-index-key
        <li key={i}>{config}</li>
      ))}
    </ul>
  );
}
