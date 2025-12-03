import type { UrlObject } from "node:url";

import type { LinkProps } from "next/link";

import * as icons from "../_components/primitives/icons";

type ValidHref = Exclude<LinkProps<unknown>["href"], UrlObject>;

type ToolGroups = {
  [key: string]: ToolGroup;
};

export type ToolGroup = {
  Icon: icons.Icon;
  title: string;
  href: ValidHref;
  tools: { [key: string]: Tool };
};

export type Tool = {
  Icon: icons.Icon;
  shortTitle: string;
  longTitle: string;
  description: string;
  keywords: string;
  href: ValidHref;
};

export const toolGroups = {
  converters: {
    Icon: icons.ArrowRightLeft,
    title: "Converters",
    href: "/converters",
    tools: {
      jsonYaml: {
        Icon: icons.ArrowRightLeft,
        shortTitle: "Json <> Yaml",
        longTitle: "Json <> Yaml Converter",
        description: "Convert Json data to Yaml and vice versa",
        keywords: "json yaml converter",
        href: "/converters/json-yaml",
      },
      numberBase: {
        Icon: icons.Hash,
        shortTitle: "Number Base",
        longTitle: "Number Base Converter",
        description: "Convert numbers from one base to another",
        keywords: "number base converter",
        href: "/converters/number-base",
      },
    },
  },
  encodersDecoders: {
    Icon: icons.Binary,
    title: "Encoders / Decoders",
    href: "/encoders-decoders",
    tools: {
      html: {
        Icon: icons.Code,
        shortTitle: "HTML",
        longTitle: "HTML Encoder / Decoder",
        description:
          "Encode or decode all the applicable characters to their corresponding HTML entities",
        keywords: "html encoder escaper decocder unescaper",
        href: "/encoders-decoders/html",
      },
      url: {
        Icon: icons.Link,
        shortTitle: "URL",
        longTitle: "URL Encoder / Decoder",
        description:
          "Encode or decode all the applicable characters to their corresponding URL entities",
        keywords: "url encoder escaper decocder unescaper",
        href: "/encoders-decoders/url",
      },
      base64: {
        Icon: icons.Equal,
        shortTitle: "Base 64",
        longTitle: "Base 64 Encoder / Decoder",
        description: "Encode and decode Base64 data",
        keywords: "base64 encoder decocder",
        href: "/encoders-decoders/base64",
      },
      jwt: {
        Icon: icons.Key,
        shortTitle: "JWT",
        longTitle: "JWT Decoder",
        description: "Decode a JWT header, payload and signature",
        keywords: "jwt json web token decocder",
        href: "/encoders-decoders/jwt",
      },
    },
  },
  formatters: {
    Icon: icons.AlignLeft,
    title: "Formatters",
    href: "/formatters",
    tools: {
      json: {
        Icon: icons.Braces,
        shortTitle: "Json",
        longTitle: "JSON Formatter",
        description: "Indent or minify JSON data",
        keywords: "json formatter",
        href: "/formatters/json",
      },
    },
  },
  generators: {
    Icon: icons.PackagePlus,
    title: "Generators",
    href: "/generators",
    tools: {
      hash: {
        Icon: icons.Fingerprint,
        shortTitle: "Hash",
        longTitle: "Hash Generator",
        description: "Calculate MD5, SHA1, SHA256 and SHA512 hash from text data",
        keywords: "hash generator md5 sha1 sha256 sha512",
        href: "/generators/hash",
      },
      uuid: {
        Icon: icons.Hash,
        shortTitle: "UUID",
        longTitle: "UUID Generator",
        description: "Generate UUIDs version 1 and 4",
        keywords: "guid uuid1 uuid4 generator",
        href: "/generators/uuid",
      },
    },
  },
  text: {
    Icon: icons.Type,
    title: "Text",
    href: "/text",
    tools: {
      inspector_and_case_converter: {
        Icon: icons.CaseSensitive,
        shortTitle: "Inspector & Case Converter",
        longTitle: "Text Inspector & Case Converter",
        description: "Analyze text and convert it to a different case",
        keywords: "case converter convert text inspector inspect",
        href: "/text/inspector",
      },
      diff: {
        Icon: icons.Diff,
        shortTitle: "Text Diff",
        longTitle: "Text Comparer",
        description: "Compare two texts and highlight the differences",
        keywords: "text comparer compare diff highlight",
        href: "/text/diff",
      },
    },
  },
} as const satisfies ToolGroups;

export const singleTools = {
  allTools: {
    Icon: icons.Home,
    shortTitle: "All tools",
    longTitle: "All tools",
    href: "/",
  },
  settings: {
    Icon: icons.Settings,
    shortTitle: "Settings",
    longTitle: "Settings",
    description: "Customize DevToysWeb look & feel",
    keywords: "settings customization configurations devtoysweb look&feel",
    href: "/settings",
  },
} as const;

export const homeTools: Tool[] = [
  ...Object.values(toolGroups).flatMap(({ tools }) => Object.values<Tool>(tools)),
  singleTools.settings,
];
