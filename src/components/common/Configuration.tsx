import { Box, Paper, Stack, Typography } from "@mui/material";
import { css, Theme } from "@mui/material/styles";
import { memo, ReactNode } from "react";

export type Props = {
  icon: ReactNode;
  title: string;
  input: ReactNode;
};

const paper = (theme: Theme) => css`
  padding: ${theme.spacing(2)};
  height: ${theme.spacing(8)};
`;

const StyledComponent = ({ icon, title, input }: Props) => (
  <Paper css={paper}>
    <Stack direction="row" alignItems="center" height={theme => theme.spacing(4)}>
      <Stack direction="row" spacing={2}>
        {icon}
        <Typography>{title}</Typography>
      </Stack>
      <Box marginLeft="auto">{input}</Box>
    </Stack>
  </Paper>
);

export const Component = memo(StyledComponent);

export default Component;
