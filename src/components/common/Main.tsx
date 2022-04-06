import { Stack, StackProps, Typography } from "@mui/material";
import { css, Theme } from "@mui/material/styles";
import { memo, PropsWithChildren } from "react";

export type Props = PropsWithChildren<{ title: string } & StackProps>;

const mainTitle = (theme: Theme) => css`
  font-size: ${theme.typography.fontSize * 3}px;
  font-weight: 400;
`;

const StyledComponent = ({ children, title, ...stackProps }: Props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Stack component="main" height="100%" padding={6} spacing={2} {...stackProps}>
    <Typography variant="h1" css={mainTitle}>
      {title}
    </Typography>
    <Stack spacing={2} flexGrow={1}>
      {children}
    </Stack>
  </Stack>
);

export const Component = memo(StyledComponent);

export default Component;
