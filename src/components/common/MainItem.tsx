import { Box, Typography } from "@mui/material";
import { memo, PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  title: string;
}>;

const StyledComponent = ({ children, title }: Props) => (
  <Box>
    <Typography variant="h6" component="h2">
      {title}
    </Typography>
    {children}
  </Box>
);

export const Component = memo(StyledComponent);

export default Component;
