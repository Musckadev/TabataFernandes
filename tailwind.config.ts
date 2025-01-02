import { type Config } from "tailwindcss"
import { fontFamily } from "tailwindcss/defaultTheme"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Cor principal
        primary: {
          DEFAULT: "#7c9e91",
          light: "#a3bbb2",
          dark: "#5c7d71",
          50: "#f3f7f5",
          100: "#e7efeb",
          200: "#d0e0d8",
          300: "#b8d0c5",
          400: "#a3bbb2",
          500: "#7c9e91",
          600: "#5c7d71",
          700: "#4c6860",
          800: "#3d534d",
          900: "#2e3f3a",
        },
        // Cores complementares
        secondary: {
          DEFAULT: "#9e7c89",
          light: "#bba3ad",
          dark: "#7d5c68",
        },
        accent: {
          DEFAULT: "#7c899e",
          light: "#a3adb8",
          dark: "#5c687d",
        },
        // Tons neutros
        neutral: {
          DEFAULT: "#f8f9fa",
          50: "#f8f9fa",
          100: "#e9ecef",
          200: "#dee2e6",
          300: "#ced4da",
          400: "#adb5bd",
          500: "#6c757d",
          600: "#495057",
          700: "#343a40",
          800: "#212529",
          900: "#1a1d20",
        },
        // Estados
        success: {
          DEFAULT: "#7c9e83",
          light: "#a3bba8",
          dark: "#5c7d61",
        },
        warning: {
          DEFAULT: "#9e947c",
          light: "#bbb5a3",
          dark: "#7d735c",
        },
        error: {
          DEFAULT: "#9e7c7c",
          light: "#bba3a3",
          dark: "#7d5c5c",
        },
        info: {
          DEFAULT: "#7c919e",
          light: "#a3b2bb",
          dark: "#5c707d",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
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
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
