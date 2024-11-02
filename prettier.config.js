/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
module.exports = {
  printWidth: 100,
  arrowParens: "avoid",
  importOrder: [
    "<BUILTIN_MODULES>",
    "",
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "<THIRD_PARTY_MODULES>",
    "",
    "^(../)+_config/(.*)$",
    "^(../)+_contexts/(.*)$",
    "^(../)+_hooks/(.*)$",
    "^(../)+_lib/(.*)$",
    "^(../)+_layout/(.*)$",
    "^(../)+_components/primitives/(.*)$",
    "^(../)+_components/(.*)$",
    "",
    "^[./]",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
};
