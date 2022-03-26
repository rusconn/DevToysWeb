import { Skeleton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ComponentPropsWithoutRef, memo } from "react";

import { drawerWidth } from "@/components/layout/Drawer";
import { headerHeight } from "@/components/layout/Header";

type Props = Omit<ComponentPropsWithoutRef<typeof Skeleton>, "width">;

const StyledComponent = (props: Props) => {
  const theme = useTheme();

  return (
    <Skeleton
      variant="rectangular"
      height={`calc(100vh - ${headerHeight}px - ${theme.spacing(6 * 2)} - 192px`}
      width={`calc(calc(100vw - ${drawerWidth}px - ${theme.spacing(6 * 2)} - 18px) / 2)`}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
};

export const Component = memo(StyledComponent);

export default Component;
