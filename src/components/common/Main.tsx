import { Box, css, Stack, Theme, Typography } from "@mui/material";
import { memo, PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  title: string;
}>;

const mainTitle = (theme: Theme) => css`
  font-size: ${theme.typography.fontSize * 3}px;
  font-weight: 400;
  margin-bottom: ${theme.spacing(2)};
`;

const StyledComponent = ({ children, title }: Props) => (
  <Box component="main" padding={6}>
    <Typography variant="h1" css={mainTitle}>
      {title}
    </Typography>
    <Stack spacing={2}>{children}</Stack>
  </Box>
);

export const Component = memo(StyledComponent);

export default Component;
