import { useCallback, useRef } from "react";

import { icons } from "@/components/icons";

import { BaseButton, BaseButtonProps } from "./base";

type InputProps = React.ComponentProps<"input">;

export type FileButtonProps = Pick<InputProps, "accept"> &
  Omit<BaseButtonProps, "icon" | "labelText" | "onClick"> & {
    maxFileSizeMb?: number;
    onFileRead: (text: string) => void;
  };

export function FileButton({
  accept,
  iconOnly,
  maxFileSizeMb = 20,
  onFileRead,
  ...props
}: FileButtonProps) {
  const ref = useRef<HTMLInputElement>(null);

  const onClick = () => ref.current?.click();

  const onChange: NonNullable<InputProps["onChange"]> = useCallback(
    ({ currentTarget }) => {
      const file = Array.from(currentTarget.files ?? []).at(0);

      if (!file) {
        return;
      }

      // TODO: reject if the file is unsupported

      if (file.size > maxFileSizeMb * 2 ** 20) {
        // eslint-disable-next-line no-alert
        return alert(`The file is too big. Up to ${maxFileSizeMb}MiB.`);
      }

      const reader = new FileReader();

      reader.onload = ({ target }) => {
        if (typeof target?.result === "string") {
          onFileRead(target?.result);
        }
      };

      reader.readAsText(file);

      // clear selected file to accept the same file again
      // eslint-disable-next-line no-param-reassign
      currentTarget.value = "";
    },
    [maxFileSizeMb, onFileRead]
  );

  return (
    <>
      <BaseButton
        {...props}
        icon={<icons.File size={16} />}
        {...{ iconOnly, onClick }}
        labelText="Load a file"
      />
      <input hidden type="file" {...{ ref, accept, onChange }} />
    </>
  );
}
