import { css, ListItemIcon } from "@mui/material";
import { memo, ReactNode } from "react";

type Props = {
  icon: ReactNode;
};

const itemIcon = css`
  min-width: 40px;
  vertical-align: middle;
`;

const StyledComponent = ({ icon }: Props) => <ListItemIcon css={itemIcon}>{icon}</ListItemIcon>;

export const Component = memo(StyledComponent);

export default Component;
