import { fixupConfigRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import eslint from "@eslint/js";
import prettier from "eslint-config-prettier";
import reactCompiler from "eslint-plugin-react-compiler";
import tseslint from "typescript-eslint";

const flatCompat = new FlatCompat();

export default [
  {
    ignores: [
      "dist",
      ".cache",
      "public",
      "node_modules",
      "out",
      "test-results/",
      "playwright-report/",
      "playwright/.cache/",
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  ...fixupConfigRules(flatCompat.extends("next/core-web-vitals")),
  prettier,
  {
    linterOptions: {
      reportUnusedDisableDirectives: "error",
    },
    plugins: {
      "react-compiler": reactCompiler,
    },
    settings: {
      next: {
        rootDir: ["./"],
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: ["next.config.ts", "tests/**", "playwright.config.ts"],
        },
      ],
      "react-compiler/react-compiler": "error",
    },
  },
];
