import { Box, css, Stack } from "@mui/material";
import Head from "next/head";
import { memo, PropsWithChildren } from "react";

import { site } from "@/data";
import { staticPath } from "@/libs/$path";

import Drawer, { drawerWidth } from "./Drawer";
import Header, { headerHeight } from "./Header";

type Props = PropsWithChildren<unknown>;

const content = css`
  width: calc(100vw - ${drawerWidth}px);
  background-color: #f9f9f9;
  overflow: auto;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-top-left-radius: 8px;
`;

const StyledComponent = ({ children }: Props) => (
  <>
    <Head>
      <title>{site.title}</title>
      <link rel="icon" href={staticPath.favicon_ico} />
      <meta name="description" content="DevToys web clone" />
      <meta name="og:title" content={site.title} />
      <meta name="og:site_name" content={site.title} />
      <meta name="og:type" content="website" />
    </Head>
    <Header />
    <Stack direction="row" height={`calc(100vh - ${headerHeight}px)`}>
      <Drawer />
      <Box css={content}>{children}</Box>
    </Stack>
  </>
);

export const Component = memo(StyledComponent);

export default Component;
