import { TextField } from "@mui/material";
import { ComponentPropsWithoutRef, memo } from "react";

type Props = ComponentPropsWithoutRef<typeof TextField>;

const StyledComponent = (props: Props) => (
  <TextField
    fullWidth
    hiddenLabel
    size="small"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
);

export const Component = memo(StyledComponent);

export default Component;
