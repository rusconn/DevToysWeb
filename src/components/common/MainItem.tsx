import { Box, Stack, Typography } from "@mui/material";
import { ComponentPropsWithoutRef, memo, PropsWithChildren } from "react";

type Props = PropsWithChildren<
  {
    title: string;
  } & ComponentPropsWithoutRef<typeof Stack>
>;

const StyledComponent = ({ children, title, ...stackProps }: Props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Stack {...stackProps}>
    <Typography variant="h6" component="h2">
      {title}
    </Typography>
    <Box flexGrow={1}>{children}</Box>
  </Stack>
);

export const Component = memo(StyledComponent);

export default Component;
