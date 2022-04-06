import { Stack } from "@mui/material";
import equal from "fast-deep-equal";
import { memo } from "react";

import Configuration, { Props as ConfigurationProps } from "./Configuration";

export type Props = {
  configurations: ConfigurationProps[];
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
