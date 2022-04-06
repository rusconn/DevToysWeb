import { TextField, TextFieldProps } from "@mui/material";
import { memo } from "react";

export type Props = TextFieldProps;

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
