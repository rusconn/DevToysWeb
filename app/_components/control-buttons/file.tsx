import { ComponentProps, useRef } from "react";

import * as icons from "../../_components/primitives/icons";

import { Base, BaseProps } from "./base";

type InputProps = ComponentProps<"input">;

export type FileProps = Pick<InputProps, "accept"> &
  Omit<BaseProps, "icon" | "labelText" | "onClick"> & {
    maxFileSizeMiB?: number;
    onFileRead: (text: string) => void;
  };

export function File({ accept, maxFileSizeMiB = 20, onFileRead, ...props }: FileProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const clickInput = () => inputRef.current?.click();

  const tryLoadFileAsText: InputProps["onChange"] = e => {
    const file = e.currentTarget.files?.[0];
    if (!file) {
      return;
    }
    // TODO: reject if the file type is unsupported
    if (file.size > maxFileSizeMiB * 2 ** 20) {
      return alert(`The file is too big. Up to ${maxFileSizeMiB}MiB.`);
    }

    // currentTarget will be null after await
    const savedInput = e.currentTarget;

    void file.text().then(text => {
      onFileRead(text);
      // clear selected file to accept the same file again
      savedInput.value = "";
    });
  };

  return (
    <>
      <Base
        {...props}
        icon={<icons.File size={16} />}
        onClick={clickInput}
        labelText="Load a file"
      />
      <input hidden type="file" ref={inputRef} accept={accept} onChange={tryLoadFileAsText} />
    </>
  );
}
