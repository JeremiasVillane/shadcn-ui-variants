import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}"
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px"
      }
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar, var(--background)))",
          foreground: "hsl(var(--sidebar-foreground, var(--foreground)))",
          accent: "hsl(var(--sidebar-accent, var(--muted)))",
          "accent-foreground":
            "hsl(var(--sidebar-accent-foreground, var(--muted-foreground)))",
          primary: "hsl(var(--sidebar-primary, var(--primary)))",
          "primary-foreground":
            "hsl(var(--sidebar-primary-foreground, var(--primary-foreground)))",
          ring: "hsl(var(--sidebar-ring, var(--ring)))"
        },
        code: {
          DEFAULT: "hsl(var(--code))"
        }
      },
      fontFamily: {
        mono: ["var(--font-geist-mono)"]
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" }
        },
        "pulsing-circle": {
          "0%, 100%": { opacity: "0" },
          "30%": { opacity: "1" },
          "60%": {
            boxShadow: "0 0 0 44px hsl(var(--muted))",
            opacity: "0"
          }
        },
        "bouncing-arrow": {
          "0%, 40%, 100%": { transform: "rotate(-45deg) translate(0, 0)" },
          "20%": { transform: "rotate(-45deg) translate(-10px, 10px)" }
        },
        "fading-arrow": {
          "0%": {
            transform: "rotate(-45deg) translate(0, 0)",
            opacity: "0"
          },
          "50%": {
            opacity: "1"
          },
          "100%": {
            transform: "rotate(-45deg) translate(-20px, 20px)",
            opacity: "0"
          }
        },
        "spinning-arrow": {
          "0%, 100%": {
            transform: "rotateY(0) rotateZ(-45deg) translate(0, 0)",
            opacity: "0"
          },
          "50%": { opacity: "1" },
          "100%": {
            transform: "rotateY(720deg) rotateZ(-45deg) translate(-20px, 20px)",
            opacity: "0"
          }
        },
        "multi-arrow": {
          "0%, 100%": { opacity: "0" },
          "50%": { opacity: "1" }
        },
        "mouse-animated": {
          "0%, 100%": {
            transform: "translate(0, 0)",
            opacity: "0"
          },
          "40%": { opacity: "1" },
          "80%": {
            transform: "translate(0, 20px)",
            opacity: "0"
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulsing-circle": "pulsing-circle 3s infinite",
        "bouncing-arrow": "bouncing-arrow 2s infinite",
        "fading-arrow": "fading-arrow 1.5s infinite",
        "spinning-arrow": "spinning-arrow 1.5s infinite",
        "multi-arrow": "multi-arrow 2s infinite",
        "mouse-animated": "mouse-animated 2s infinite"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
} satisfies Config

export default config
