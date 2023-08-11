const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        border: "hsl(var(--border))",
        separator: "hsl(var(--separator))",
        page: "hsl(var(--page))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
          hover: "hsl(var(--card-hover))",
          icon: {
            DEFAULT: "hsl(var(--card-icon))",
            hover: "hsl(var(--card-icon-hover))",
          },
          muted: {
            foreground: "hsl(var(--card-muted-foreground))",
          },
        },
        configuration: "hsl(var(--configuration))",
        switch: {
          DEFAULT: "hsl(var(--switch))",
          hover: "hsl(var(--switch-hover))",
        },
        select: {
          DEFAULT: "hsl(var(--select))",
          hover: "hsl(var(--select-hover))",
          content: {
            DEFAULT: "hsl(var(--select-content))",
            foreground: "hsl(var(--select-content-foreground))",
          },
          item: {
            hover: "hsl(var(--select-item-hover))",
            focus: "hsl(var(--select-item-focus))",
          },
        },
        input: {
          DEFAULT: "hsl(var(--input))",
          hover: "hsl(var(--input-hover))",
          focus: "hsl(var(--input-focus))",
        },
        textarea: {
          DEFAULT: "hsl(var(--textarea))",
          hover: "hsl(var(--textarea-hover))",
          focus: "hsl(var(--textarea-focus))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          hover: "hsl(var(--primary-hover))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          hover: "hsl(var(--secondary-hover))",
        },
        tooltip: {
          DEFAULT: "hsl(var(--tooltip))",
          foreground: "hsl(var(--tooltip-foreground))",
        },
        indicator: {
          DEFAULT: "hsl(var(--indicator))",
          hover: "hsl(var(--indicator-hover))",
        },
        link: "hsl(var(--link))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        mono: ["var(--font-mono)", ...fontFamily.mono],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
