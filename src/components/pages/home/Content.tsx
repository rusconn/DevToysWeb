import {
  Code,
  DataObject,
  DragHandle,
  Filter,
  Fingerprint,
  Key,
  Link,
  Numbers,
  TextIncrease,
  Transform,
} from "@mui/icons-material";
import { Grid } from "@mui/material";
import Fuse from "fuse.js";
import { memo } from "react";
import { selector, useRecoilValue } from "recoil";

import { Main } from "@/components/common";
import { searchTextState } from "@/components/layout/states";
import { pagesPath } from "@/libs/$path";

import Card from "./Card";

type Props = {
  filteredTools: typeof tools;
};

const tools = [
  {
    icon: <Transform />,
    title: "Json <> Yaml Converter",
    description: "Convert Json data to Yaml and vice versa",
    keywords: "json yaml converter",
    href: pagesPath.converters.json_yaml.$url(),
    disabled: false,
  },
  {
    icon: <Numbers />,
    title: "Number Base Converter",
    description: "Convert numbers from one base to another",
    keywords: "number base converter",
    href: pagesPath.converters.number_base.$url(),
    disabled: false,
  },
  {
    icon: <Code />,
    title: "HTML Encoder / Decoder",
    description:
      "Encode or decode all the applicable characters to their corresponding HTML entities",
    keywords: "html encoder escaper decocder unescaper",
    href: pagesPath.$url(),
    disabled: true,
  },
  {
    icon: <Link />,
    title: "URL Encoder / Decoder",
    description:
      "Encode or decode all the applicable characters to their corresponding URL entities",
    keywords: "url encoder escaper decocder unescaper",
    href: pagesPath.$url(),
    disabled: true,
  },
  {
    icon: <DragHandle />,
    title: "Base 64 Encoder / Decoder",
    description: "Encode and decode Base64 data",
    keywords: "base64 encoder decocder",
    href: pagesPath.$url(),
    disabled: true,
  },
  {
    icon: <Key />,
    title: "JWT Decoder",
    description: "Decode a JWT header, payload and signature",
    keywords: "jwt json web token decocder",
    href: pagesPath.$url(),
    disabled: true,
  },
  {
    icon: <DataObject />,
    title: "JSON Formatter",
    description: "Indent or minify JSON data",
    keywords: "json formatter",
    href: pagesPath.$url(),
    disabled: true,
  },
  {
    icon: <Fingerprint />,
    title: "Hash Generator",
    description: "Calculate MD5, SHA1, SHA256 and SHA512 hash from text data",
    keywords: "hash generator md5 sha1 sha256 sha512",
    href: pagesPath.$url(),
    disabled: true,
  },
  {
    icon: <Numbers />,
    title: "UUID Generator",
    description: "Generate UUIDs version 1 and 4",
    keywords: "guid uuid1 uuid4 generator",
    href: pagesPath.$url(),
    disabled: true,
  },
  {
    icon: <TextIncrease />,
    title: "Regex Tester",
    description: "Validate and test regular expressions",
    keywords: "regular expression regex validator tester",
    href: pagesPath.$url(),
    disabled: true,
  },
  {
    icon: <Filter />,
    title: "PNG / JPEG Compressor",
    description: "Lossless PNG and JPEG optimizer",
    keywords: "png jpeg compressor optimizer image",
    href: pagesPath.$url(),
    disabled: true,
  },
];

const StyledComponent = ({ filteredTools }: Props) => (
  <Main title="All tools">
    <Grid container rowSpacing={4} columnSpacing={2}>
      {filteredTools.map(({ icon, title, description, href, disabled }) => (
        <Grid key={title} item>
          <Card {...{ icon, title, description, href, disabled }} />
        </Grid>
      ))}
    </Grid>
  </Main>
);

export const Component = memo(StyledComponent);

const filteredToolsState = selector({
  key: "filteredToolsState",
  get: ({ get }) => {
    const searchText = get(searchTextState).trim();

    if (searchText === "") {
      return { filteredTools: tools };
    }

    const searchWords = searchText.split(" ").map(word => ({ keywords: word }));

    const fuse = new Fuse(tools, { keys: ["keywords"], threshold: 0.5 });
    const result = fuse.search({ $and: searchWords });
    const filteredTools = result.map(({ item }) => item);

    return { filteredTools };
  },
});

const Container = () => {
  const { filteredTools } = useRecoilValue(filteredToolsState);

  return <Component {...{ filteredTools }} />;
};

export default Container;
