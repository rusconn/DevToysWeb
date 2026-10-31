import type { ComponentPropsWithRef } from "react";

import { DiffEditor as MonacoDiffEditor } from "@monaco-editor/react";

import { useTheme } from "../hooks/use-theme";

export type EditorProps = ComponentPropsWithRef<typeof MonacoDiffEditor>;

export const DiffEditor = ({ options, theme, ...props }: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const themeToUse = theme ?? (resolvedTheme === "light" ? "light" : "vs-dark");

  return (
    <MonacoDiffEditor
      theme={themeToUse}
      options={{
        tabFocusMode: true,
        automaticLayout: true,
        scrollBeyondLastLine: false,
        ...options, // NOTE: merge shallowly
      }}
      {...props}
    />
  );
};
