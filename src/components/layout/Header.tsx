import GitHubIcon from "@mui/icons-material/GitHub";
import {
  AppBar,
  css,
  IconButton,
  Link as MuiLink,
  Stack,
  Theme,
  Toolbar,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { memo } from "react";

import { site } from "@/data";
import { pagesPath } from "@/libs/$path";

export const headerHeight = 48;

const appBar = css`
  background-color: transparent;
  box-shadow: none;
`;

const toolbar = (theme: Theme) => css`
  padding: 0 ${theme.spacing(2)} !important;
`;

const topLink = css`
  color: black;
  text-decoration: none;
  cursor: pointer;
  font-weight: 400;
`;

const description = (theme: Theme) => css`
  color: black;
  font-size: ${theme.typography.fontSize * 1.4}px;
`;

const gitHubLink = (theme: Theme) => css`
  color: black;
  margin-left: auto;
  width: ${theme.typography.fontSize * 3}px;
  height: ${theme.typography.fontSize * 3}px;
`;

const gitHubIcon = (theme: Theme) => css`
  width: ${theme.typography.fontSize * 3};
  height: ${theme.typography.fontSize * 3};
`;

const StyledComponent = () => (
  <AppBar position="relative" css={appBar}>
    <Toolbar variant="dense" css={toolbar}>
      <Stack direction="row" spacing={1} alignItems="baseline" flexGrow={1}>
        <NextLink href={pagesPath.$url()} passHref>
          <MuiLink variant="h6" css={topLink}>
            {site.title}
          </MuiLink>
        </NextLink>
        <Typography css={description}>
          web clone of{" "}
          <a href="https://devtoys.app" target="_blank" rel="noreferrer">
            DevToys
          </a>
        </Typography>
      </Stack>
      <IconButton>
        <a
          href="https://github.com/rusconn/DevToysWeb"
          target="_blank"
          rel="noreferrer"
          css={gitHubLink}
        >
          <GitHubIcon css={gitHubIcon} />
        </a>
      </IconButton>
    </Toolbar>
  </AppBar>
);

export const Component = memo(StyledComponent);

export default Component;
