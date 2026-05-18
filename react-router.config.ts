import type { Config } from "@react-router/dev/config";

export default {
  ssr: false,
  prerender({ getStaticPaths }) {
    const paths = getStaticPaths();
    return ["/404", ...paths];
  },
} satisfies Config;
