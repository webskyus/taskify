import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Shadcn
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // Foundation colors
        "foundation-wireframe": {
          "very-dark": "#606577",
          "dark": "#cdcfd7",
          "medium": "#e4e6ed",
          "light": "#eff1f6",
          "very-light": "#ffffff"
        },
        "foundation-primary": {
          "50": "#eaeaec",
          "100": "#bfbdc5",
          "200": "#9f9da9",
          "300": "#747181",
          "400": "#595569",
          "500": "var(--accent-black)",
          "600": "#2b273d",
          "700": "#211f30",
          "800": "#1a1825",
          "900": "#14121c"
        },
        "foundation-neutral": {
          "0": "#ffffff",
          "25": "#fafafb",
          "50": "#f5f6f6",
          "100": "#d5dae0",
          "200": "#cbd4df",
          "300": "#c3c5c8",
          "400": "#83879b",
          "500": "#9b9da3",
          "600": "#55606d",
          "700": "#434956",
          "800": "#1c222e",
          "900": "#111111",
          "1000": "#1e1e1e"
        },
        "foundation-secondary": {
          "50": "#f9f9f9",
          "100": "#ebebeb",
          "200": "#d0d5dd",
          "300": "#cdcfd7",
          "400": "#777777"
        },
        "foundation-green": {
          "50": "#ebf9f1",
          "100": "#8ddcac",
          "200": "#5bcc88",
          "300": "#5db06f",
          "400": "#29884e"
        },
        "foundation-yellow": {
          "50": "#fef7e8",
          "100": "#f9ce7a",
          "200": "#f9c96c",
          "300": "#f0be4c",
          "400": "#ac7812"
        },
        "foundation-red": {
          "50": "#feeded",
          "100": "#f99696",
          "200": "#f88787",
          "300": "#e47d71",
          "400": "#ab3434"
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        Inter: [
            "Inter",
          ...defaultTheme.fontFamily.sans
        ],
      },
      fontSize: {
        "xs": "0.75rem",
        "sm": "0.875rem",
        "base": "1rem",
        "lg": "1.125rem",
        "xl": "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.75rem"
      },
    },
  },
  plugins: [
      require("tailwindcss-animate")
  ],
} satisfies Config

