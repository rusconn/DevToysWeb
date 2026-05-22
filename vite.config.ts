import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import babel from "vite-plugin-babel";

export default defineConfig({
  build: {
    assetsInlineLimit: 0,
  },
  plugins: [
    babel({
      include: ["./app/**/*"],
      filter: /\.[jt]sx?$/,
      babelConfig: {
        presets: ["@babel/preset-typescript"],
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
    reactRouter(),
    tailwindcss(),
  ],
});
