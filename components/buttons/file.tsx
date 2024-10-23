import { useRef } from "react";

import * as icons from "@/components/icons";

import { Base, BaseProps } from "./base";

type InputProps = React.ComponentProps<"input">;

export type FileProps = Pick<InputProps, "accept"> &
  Omit<BaseProps, "icon" | "labelText" | "onClick"> & {
    maxFileSizeMb?: number;
    onFileRead: (text: string) => void;
  };

export function File({ accept, iconOnly, maxFileSizeMb = 20, onFileRead, ...props }: FileProps) {
  const ref = useRef<HTMLInputElement>(null);

  const onClick = () => ref.current?.click();

  const onChange: NonNullable<InputProps["onChange"]> = e => {
    const file = Array.from(e.currentTarget.files ?? []).at(0);

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
    e.currentTarget.value = "";
  };

  return (
    <>
      <Base
        {...props}
        icon={<icons.File size={16} />}
        {...{ iconOnly, onClick }}
        labelText="Load a file"
      />
      <input hidden type="file" {...{ ref, accept, onChange }} />
    </>
  );
}
