import { Stack } from "@mui/material";
import equal from "fast-deep-equal";
import { ComponentPropsWithoutRef, memo } from "react";

import Configuration from "./Configuration";

type Props = {
  configurations: ComponentPropsWithoutRef<typeof Configuration>[];
};

const StyledComponent = ({ configurations }: Props) => (
  <Stack spacing={1}>
    {configurations.map(({ icon, title, input }) => (
      <Configuration key={title} {...{ icon, title, input }} />
    ))}
  </Stack>
);

export const Component = memo(StyledComponent, equal);

export default Component;
