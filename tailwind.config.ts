import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./data/**/*.{ts,tsx}",
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
        },
        "toast-fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        "toast-slide-down": {
          "0%": { opacity: "0", transform: "translateY(-100%)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "toast-slide-up": {
          "0%": { opacity: "0", transform: "translateY(100%)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "toast-slide-left": {
          "0%": { opacity: "0", transform: "translateX(100%)" },
          "100%": { opacity: "1", transform: "translateX(0)" }
        },
        "toast-slide-right": {
          "0%": { opacity: "0", transform: "translateX(-100%)" },
          "100%": { opacity: "1", transform: "translateX(0)" }
        },
        "toast-zoom-in": {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1)" }
        },
        "toast-fade-out": { from: { opacity: "1" }, to: { opacity: "0" } },
        "toast-slide-out-up": {
          from: { opacity: "1", transform: "translateY(0)" },
          to: { opacity: "0", transform: "translateY(-100%)" }
        },
        "toast-slide-out-down": {
          from: { opacity: "1", transform: "translateY(0)" },
          to: { opacity: "0", transform: "translateY(100%)" }
        },
        "toast-slide-out-right": {
          from: { opacity: "1", transform: "translateX(0)" },
          to: { opacity: "0", transform: "translateX(100%)" }
        },
        "toast-slide-out-left": {
          from: { opacity: "1", transform: "translateX(0)" },
          to: { opacity: "0", transform: "translateX(-100%)" }
        },
        "toast-zoom-out": {
          from: { opacity: "1", transform: "scale(1)" },
          to: { opacity: "0", transform: "scale(0.8)" }
        },
        "toast-progress-bar-decrease": {
          from: { width: "100%" },
          to: { width: "0%" }
        },
        "check-appear": {
          "0%": {
            height: "0",
            transform: "translateY(-100%)"
          },
          "100%": {
            height: "100%",
            transform: "translateY(0)"
          }
        },
        "check-flip": {
          "0%": {
            transform: "rotateY(90deg)"
          },
          "100%": {
            transform: "rotateY(0)"
          }
        },
        "check-unflip": {
          "0%": {
            transform: "rotateY(0)"
          },
          "100%": {
            transform: "rotateY(90deg)"
          }
        },
        "check-impulse": {
          "0%": {
            opacity: "0",
            transform: "scale(0)",
            transition: "all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1.5)"
          },
          "100%": {
            opacity: "1",
            transform: "scale(1.3)"
          }
        },
        "check-fill": {
          "0%": {
            position: "absolute",
            transform: "rotateZ(45deg)",
            top: "-52px",
            left: "-52px"
          },
          "100%": {
            position: "absolute",
            transform: "rotateZ(-90deg)",
            top: "-10px",
            left: "-10px"
          }
        },
        "check-unfill": {
          "0%": {
            position: "absolute",
            transform: "rotateZ(-90deg)",
            top: "-10px",
            left: "-10px"
          },
          "100%": {
            position: "absolute",
            transform: "rotateZ(45deg)",
            top: "-52px",
            left: "-52px"
          }
        },
        "check-draw": {
          "0%": { "stroke-dashoffset": "-24" },
          "100%": { "stroke-dashoffset": "0" }
        },
        "check-erase": {
          "0%": { "stroke-dashoffset": "0" },
          "100%": { "stroke-dashoffset": "-24" }
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
        "mouse-animated": "mouse-animated 2s infinite",
        "toast-fade-in": "toast-fade-in 0.3s ease-out forwards",
        "toast-slide-down": "toast-slide-down 0.3s ease-out forwards",
        "toast-slide-up": "toast-slide-up 0.3s ease-out forwards",
        "toast-slide-left": "toast-slide-left 0.3s ease-out forwards",
        "toast-slide-right": "toast-slide-right 0.3s ease-out forwards",
        "toast-zoom-in": "toast-zoom-in 0.3s ease-out forwards",
        "toast-fade-out": "toast-fade-out 0.3s ease-in forwards",
        "toast-slide-out-up": "toast-slide-out-up 0.3s ease-in forwards",
        "toast-slide-out-down": "toast-slide-out-down 0.3s ease-in forwards",
        "toast-slide-out-right": "toast-slide-out-right 0.3s ease-in forwards",
        "toast-slide-out-left": "toast-slide-out-left 0.3s ease-in forwards",
        "toast-zoom-out": "toast-zoom-out 0.3s ease-in forwards",
        "toast-progress-bar": "toast-progress-bar-decrease linear forwards",
        "check-appear": "check-appear 0.2s ease-out forwards",
        "check-flip": "check-flip 0.3s ease-out",
        "check-unflip": "check-unflip 0.1s",
        "check-impulse": "check-impulse 0.3s",
        "check-fill": "check-fill 0.2s ease-in",
        "check-unfill": "check-unfill 0.3s ease-out",
        "check-draw": "check-draw 0.3s ease-out forwards",
        "check-erase": "check-erase 0.2s ease-in forwards"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
} satisfies Config

export default config
