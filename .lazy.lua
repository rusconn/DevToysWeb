vim.g.lazyvim_ts_lsp = "tsc"

return {
  { import = "lazyvim.plugins.extras.lang.typescript" },
  { import = "lazyvim.plugins.extras.lang.typescript.tsc" },
  { import = "lazyvim.plugins.extras.lang.typescript.biome" },
  { import = "lazyvim.plugins.extras.lang.tailwind" },
}
