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
  $url: (url?: { hash?: string }) => ({ pathname: "/" as const, hash: url?.hash }),
};

export type PagesPath = typeof pagesPath;

export const staticPath = {
  favicon_ico: "/favicon.ico",
} as const;

export type StaticPath = typeof staticPath;
