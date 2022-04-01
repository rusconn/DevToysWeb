import createCache from "@emotion/cache";

export const cache = createCache({ key: "css", prepend: true });
