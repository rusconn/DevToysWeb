import { Box, ListItemButton, ListItemText, Tooltip } from "@mui/material";
import { css } from "@mui/material/styles";
import NextLink, { LinkProps } from "next/link";
import { ComponentPropsWithoutRef, memo } from "react";

import DrawerItemIcon from "./DrawerItemIcon";

type Props = {
  title: string;
  disabled?: boolean;
  subItem?: true;
} & Pick<LinkProps, "href"> &
  ComponentPropsWithoutRef<typeof DrawerItemIcon>;

const indent = css`
  text-indent: 40px;
`;

const StyledComponent = ({ href, icon, title, disabled, subItem }: Props) => {
  const wrappedIcon = subItem ? (
    <Box css={indent}>
      <DrawerItemIcon {...{ icon }} />
    </Box>
  ) : (
    <DrawerItemIcon {...{ icon }} />
  );

  const link = (
    <NextLink {...{ href }} passHref>
      <ListItemButton {...{ disabled }}>
        {wrappedIcon}
        <ListItemText primary={title} />
      </ListItemButton>
    </NextLink>
  );

  return disabled ? (
    <Tooltip title="coming soon!" placement="right" arrow>
      <span>{link}</span>
    </Tooltip>
  ) : (
    link
  );
};

export const Component = memo(StyledComponent);

export default Component;
