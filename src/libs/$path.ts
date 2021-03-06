export const pagesPath = {
  converters: {
    json_yaml: {
      $url: (url?: { hash?: string }) => ({
        pathname: "/converters/json-yaml" as const,
        hash: url?.hash,
      }),
    },
    number_base: {
      $url: (url?: { hash?: string }) => ({
        pathname: "/converters/number-base" as const,
        hash: url?.hash,
      }),
    },
  },
  encoders_decoders: {
    base64: {
      $url: (url?: { hash?: string }) => ({
        pathname: "/encoders-decoders/base64" as const,
        hash: url?.hash,
      }),
    },
    html: {
      $url: (url?: { hash?: string }) => ({
        pathname: "/encoders-decoders/html" as const,
        hash: url?.hash,
      }),
    },
    jwt: {
      $url: (url?: { hash?: string }) => ({
        pathname: "/encoders-decoders/jwt" as const,
        hash: url?.hash,
      }),
    },
    url: {
      $url: (url?: { hash?: string }) => ({
        pathname: "/encoders-decoders/url" as const,
        hash: url?.hash,
      }),
    },
  },
  formatters: {
    json: {
      $url: (url?: { hash?: string }) => ({
        pathname: "/formatters/json" as const,
        hash: url?.hash,
      }),
    },
  },
  generators: {
    hash: {
      $url: (url?: { hash?: string }) => ({
        pathname: "/generators/hash" as const,
        hash: url?.hash,
      }),
    },
    uuid: {
      $url: (url?: { hash?: string }) => ({
        pathname: "/generators/uuid" as const,
        hash: url?.hash,
      }),
    },
  },
  search: {
    $url: (url?: { hash?: string }) => ({ pathname: "/search" as const, hash: url?.hash }),
  },
  $url: (url?: { hash?: string }) => ({ pathname: "/" as const, hash: url?.hash }),
};

export type PagesPath = typeof pagesPath;

export const staticPath = {
  favicon_ico: "/favicon.ico",
} as const;

export type StaticPath = typeof staticPath;
