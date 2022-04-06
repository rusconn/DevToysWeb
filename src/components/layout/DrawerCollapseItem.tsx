import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import equal from "fast-deep-equal";
import { memo, MouseEventHandler, useCallback, useState } from "react";

import DrawerItem, { Props as DrawerItemProps } from "./DrawerItem";
import DrawerItemIcon, { Props as DrawerItemIconProps } from "./DrawerItemIcon";

export type Props = {
  title: string;
  tools: DrawerItemProps[];
} & DrawerItemIconProps;

type ComponentProps = {
  open: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
} & Props;

const StyledComponent = ({ icon, title, tools, open, onClick }: ComponentProps) => (
  <>
    <ListItemButton {...{ onClick }}>
      <DrawerItemIcon {...{ icon }} />
      <ListItemText primary={title} />
      {open ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>
    <Collapse in={open} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        {tools.map(tool => (
          <DrawerItem
            key={tool.title}
            icon={tool.icon}
            title={tool.title}
            href={tool.href}
            disabled={tool.disabled}
            subItem
          />
        ))}
      </List>
    </Collapse>
  </>
);

export const Component = memo(StyledComponent, equal);

const Container = ({ icon, title, tools }: Props) => {
  const [open, setOpen] = useState(false);

  const onClick = useCallback(() => {
    setOpen(!open);
  }, [open]);

  return <Component {...{ icon, title, tools, open, onClick }} />;
};

export default Container;
