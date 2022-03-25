import {
  Code,
  DataObject,
  DragHandle,
  Filter,
  Fingerprint,
  Home,
  Image as ImageIcon,
  Key,
  Link,
  NoteAdd,
  Numbers,
  Sort,
  SyncAlt,
  TextFields,
  TextIncrease,
  Transform,
} from "@mui/icons-material";
import { Box, Divider, Drawer, List, Stack } from "@mui/material";
import { css } from "@mui/material/styles";
import { memo } from "react";

import { pagesPath } from "@/libs/$path";

import DrawerCollapseItem from "./DrawerCollapseItem";
import DrawerItem from "./DrawerItem";
import SearchBar from "./SearchBar";

export const drawerWidth = 300;

const drawer = css`
  width: ${drawerWidth}px;
  flex-shrink: 0;
  & .MuiDrawer-paper {
    position: relative;
    border: none;
    background-color: transparent;
  }
`;

const divider = css`
  border-color: rgba(0, 0, 0, 0.08);
`;

const toolGroups = [
  {
    icon: <Transform />,
    title: "Converters",
    tools: [
      { icon: <Transform />, title: "Json <> Yaml", href: pagesPath.$url(), disabled: true },
      { icon: <Numbers />, title: "Number Base", href: pagesPath.$url(), disabled: true },
    ],
  },
  {
    icon: <SyncAlt />,
    title: "Encoders / Decoders",
    tools: [
      { icon: <Code />, title: "HTML", href: pagesPath.$url(), disabled: true },
      { icon: <Link />, title: "URL", href: pagesPath.$url(), disabled: true },
      { icon: <DragHandle />, title: "Base 64", href: pagesPath.$url(), disabled: true },
      { icon: <Key />, title: "JWT", href: pagesPath.$url(), disabled: true },
    ],
  },
  {
    icon: <Sort />,
    title: "Formatters",
    tools: [{ icon: <DataObject />, title: "Json", href: pagesPath.$url(), disabled: true }],
  },
  {
    icon: <NoteAdd />,
    title: "Generators",
    tools: [
      { icon: <Fingerprint />, title: "Hash", href: pagesPath.$url(), disabled: true },
      { icon: <Numbers />, title: "UUID", href: pagesPath.$url(), disabled: true },
    ],
  },
  {
    icon: <TextFields />,
    title: "Text",
    tools: [
      { icon: <TextIncrease />, title: "Regex Tester", href: pagesPath.$url(), disabled: true },
    ],
  },
  {
    icon: <ImageIcon />,
    title: "Graphic",
    tools: [
      {
        icon: <Filter />,
        title: "PNG / JPEG Compressor",
        href: pagesPath.$url(),
        disabled: true,
      },
    ],
  },
];

const StyledComponent = () => (
  <Drawer variant="permanent" css={drawer}>
    <Box paddingLeft={2} paddingRight={2} marginTop="1px">
      <SearchBar />
    </Box>
    <List component="nav">
      <Stack spacing={1}>
        <DrawerItem icon={<Home />} title="All tools" href={pagesPath.$url()} />
        <Divider css={divider} />
        <Box>
          {toolGroups.map(({ icon, title, tools }) => (
            <DrawerCollapseItem key={title} {...{ icon, title, tools }} />
          ))}
        </Box>
      </Stack>
    </List>
  </Drawer>
);

export const Component = memo(StyledComponent);

export default Component;
