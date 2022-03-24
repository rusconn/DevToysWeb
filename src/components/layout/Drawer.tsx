import CodeIcon from "@mui/icons-material/Code";
import DataObjectIcon from "@mui/icons-material/DataObject";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import FilterIcon from "@mui/icons-material/Filter";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import HomeIcon from "@mui/icons-material/Home";
import ImageIcon from "@mui/icons-material/Image";
import KeyIcon from "@mui/icons-material/Key";
import LinkIcon from "@mui/icons-material/Link";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import NumbersIcon from "@mui/icons-material/Numbers";
import SortIcon from "@mui/icons-material/Sort";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import TextIncreaseIcon from "@mui/icons-material/TextIncrease";
import TransformIcon from "@mui/icons-material/Transform";
import { Box, css, Divider, Drawer, List, Stack } from "@mui/material";
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
    icon: <TransformIcon />,
    title: "Converters",
    tools: [
      { icon: <TransformIcon />, title: "Json <> Yaml", href: pagesPath.$url(), disabled: true },
      { icon: <NumbersIcon />, title: "Number Base", href: pagesPath.$url(), disabled: true },
    ],
  },
  {
    icon: <SyncAltIcon />,
    title: "Encoders / Decoders",
    tools: [
      { icon: <CodeIcon />, title: "HTML", href: pagesPath.$url(), disabled: true },
      { icon: <LinkIcon />, title: "URL", href: pagesPath.$url(), disabled: true },
      { icon: <DragHandleIcon />, title: "Base 64", href: pagesPath.$url(), disabled: true },
      { icon: <KeyIcon />, title: "JWT", href: pagesPath.$url(), disabled: true },
    ],
  },
  {
    icon: <SortIcon />,
    title: "Formatters",
    tools: [{ icon: <DataObjectIcon />, title: "Json", href: pagesPath.$url(), disabled: true }],
  },
  {
    icon: <NoteAddIcon />,
    title: "Generators",
    tools: [
      { icon: <FingerprintIcon />, title: "Hash", href: pagesPath.$url(), disabled: true },
      { icon: <NumbersIcon />, title: "UUID", href: pagesPath.$url(), disabled: true },
    ],
  },
  {
    icon: <TextFieldsIcon />,
    title: "Text",
    tools: [
      { icon: <TextIncreaseIcon />, title: "Regex Tester", href: pagesPath.$url(), disabled: true },
    ],
  },
  {
    icon: <ImageIcon />,
    title: "Graphic",
    tools: [
      {
        icon: <FilterIcon />,
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
        <DrawerItem icon={<HomeIcon />} title="All tools" href={pagesPath.$url()} />
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
