export const PERSISTENCE_KEY = {
  panels: {
    vertical: "/text/diff#panels_vertical",
    horizontal: "/text/diff#panels_horizontal",
  },
} as const;

// No particular reason for these sizes, just feels like a good balance
export const VERTICAL_PANEL_MAX_SIZE = 80;
export const HORIZONTAL_PANEL_MAX_SIZE = 90;
export const PANEL_FULL_SIZE = 100;
