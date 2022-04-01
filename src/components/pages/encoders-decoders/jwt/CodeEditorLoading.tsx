import { Skeleton } from "@mui/material";
import { memo } from "react";

const StyledComponent = () => <Skeleton variant="rectangular" width="100%" height="160px" />;

export const Component = memo(StyledComponent);

export default Component;
