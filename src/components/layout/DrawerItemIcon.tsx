import { ListItemIcon } from "@mui/material";
import { css } from "@mui/material/styles";
import { memo, ReactNode } from "react";

export type Props = {
  icon: ReactNode;
};

const itemIcon = css`
  min-width: 40px;
  vertical-align: middle;
`;

const StyledComponent = ({ icon }: Props) => <ListItemIcon css={itemIcon}>{icon}</ListItemIcon>;

export const Component = memo(StyledComponent);

export default Component;
