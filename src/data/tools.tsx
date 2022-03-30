import {
  Code,
  DataObject,
  DragHandle,
  Filter,
  Fingerprint,
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

import { pagesPath } from "@/libs/$path";

const toolGroups = [
  {
    icon: <Transform />,
    title: "Converters",
    tools: [
      {
        icon: <Transform />,
        shortTitle: "Json <> Yaml",
        longTitle: "Json <> Yaml Converter",
        description: "Convert Json data to Yaml and vice versa",
        keywords: "json yaml converter",
        href: pagesPath.converters.json_yaml.$url(),
        disabled: false,
      },
      {
        icon: <Numbers />,
        shortTitle: "Number Base",
        longTitle: "Number Base Converter",
        description: "Convert numbers from one base to another",
        keywords: "number base converter",
        href: pagesPath.converters.number_base.$url(),
        disabled: false,
      },
    ],
  },
  {
    icon: <SyncAlt />,
    title: "Encoders / Decoders",
    tools: [
      {
        icon: <Code />,
        shortTitle: "HTML",
        longTitle: "HTML Encoder / Decoder",
        description:
          "Encode or decode all the applicable characters to their corresponding HTML entities",
        keywords: "html encoder escaper decocder unescaper",
        href: pagesPath.encoders_decoders.html.$url(),
        disabled: false,
      },
      {
        icon: <Link />,
        shortTitle: "URL",
        longTitle: "URL Encoder / Decoder",
        description:
          "Encode or decode all the applicable characters to their corresponding URL entities",
        keywords: "url encoder escaper decocder unescaper",
        href: pagesPath.encoders_decoders.url.$url(),
        disabled: false,
      },
      {
        icon: <DragHandle />,
        shortTitle: "Base 64",
        longTitle: "Base 64 Encoder / Decoder",
        description: "Encode and decode Base64 data",
        keywords: "base64 encoder decocder",
        href: pagesPath.$url(),
        disabled: true,
      },
      {
        icon: <Key />,
        shortTitle: "JWT",
        longTitle: "JWT Decoder",
        description: "Decode a JWT header, payload and signature",
        keywords: "jwt json web token decocder",
        href: pagesPath.$url(),
        disabled: true,
      },
    ],
  },
  {
    icon: <Sort />,
    title: "Formatters",
    tools: [
      {
        icon: <DataObject />,
        shortTitle: "Json",
        longTitle: "JSON Formatter",
        description: "Indent or minify JSON data",
        keywords: "json formatter",
        href: pagesPath.$url(),
        disabled: true,
      },
    ],
  },
  {
    icon: <NoteAdd />,
    title: "Generators",
    tools: [
      {
        icon: <Fingerprint />,
        shortTitle: "Hash",
        longTitle: "Hash Generator",
        description: "Calculate MD5, SHA1, SHA256 and SHA512 hash from text data",
        keywords: "hash generator md5 sha1 sha256 sha512",
        href: pagesPath.$url(),
        disabled: true,
      },
      {
        icon: <Numbers />,
        shortTitle: "UUID",
        longTitle: "UUID Generator",
        description: "Generate UUIDs version 1 and 4",
        keywords: "guid uuid1 uuid4 generator",
        href: pagesPath.$url(),
        disabled: true,
      },
    ],
  },
  {
    icon: <TextFields />,
    title: "Text",
    tools: [
      {
        icon: <TextIncrease />,
        shortTitle: "Regex Tester",
        longTitle: "Regex Tester",
        description: "Validate and test regular expressions",
        keywords: "regular expression regex validator tester",
        href: pagesPath.$url(),
        disabled: true,
      },
    ],
  },
  {
    icon: <ImageIcon />,
    title: "Graphic",
    tools: [
      {
        icon: <Filter />,
        shortTitle: "PNG / JPEG Compressor",
        longTitle: "PNG / JPEG Compressor",
        description: "Lossless PNG and JPEG optimizer",
        keywords: "png jpeg compressor optimizer image",
        href: pagesPath.$url(),
        disabled: true,
      },
    ],
  },
];

export const homeTools = toolGroups.flatMap(({ tools }) =>
  tools.map(({ shortTitle: _, longTitle, ...rest }) => ({
    ...rest,
    title: longTitle,
  }))
);

export const drawerToolGroups = toolGroups.map(({ tools, ...rest }) => ({
  ...rest,
  tools: tools.map(({ icon, shortTitle, description, href, disabled }) => ({
    icon,
    title: shortTitle,
    description,
    href,
    disabled,
  })),
}));
