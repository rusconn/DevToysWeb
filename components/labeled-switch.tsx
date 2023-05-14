import { Label } from "@/components/ui/label";
import { Switch, SwitchProps } from "@/components/ui/switch";

type Props = Omit<SwitchProps, "id"> & {
  id: string;
  label: React.ReactNode;
};

export function LabeledSwitch({ id, label, ...props }: Props) {
  return (
    // reverse to apply peer style
    <div className="flex flex-row-reverse items-center">
      <Switch className="peer" {...{ id }} {...props} />
      <Label className="cursor-pointer pr-3" htmlFor={id}>
        {label}
      </Label>
    </div>
  );
}
