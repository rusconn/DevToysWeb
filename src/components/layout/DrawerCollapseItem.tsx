import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import equal from "fast-deep-equal";
import { ComponentPropsWithoutRef, memo, MouseEventHandler, useCallback, useState } from "react";

import DrawerItem from "./DrawerItem";
import DrawerItemIcon from "./DrawerItemIcon";

type ContainerProps = {
  title: string;
  tools: ComponentPropsWithoutRef<typeof DrawerItem>[];
} & ComponentPropsWithoutRef<typeof DrawerItemIcon>;

type Props = {
  open: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
} & ContainerProps;

const StyledComponent = ({ icon, title, tools, open, onClick }: Props) => (
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

const Container = ({ icon, title, tools }: ContainerProps) => {
  const [open, setOpen] = useState(false);

  const onClick = useCallback(() => {
    setOpen(!open);
  }, [open]);

  return <Component {...{ icon, title, tools, open, onClick }} />;
};

export default Container;
