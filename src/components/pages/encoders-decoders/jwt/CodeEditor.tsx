import { ComponentPropsWithoutRef, memo } from "react";

import CodeEditor from "@/components/common/CodeEditor";

type Props = Omit<ComponentPropsWithoutRef<typeof CodeEditor>, "height" | "width">;

const StyledComponent = (props: Props) => (
  <CodeEditor
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
    readOnly
    height="160px"
    width="100%"
  />
);

export const Component = memo(StyledComponent);

export default Component;
