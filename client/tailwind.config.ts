import type { Config } from "tailwindcss";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const daisyui = require("daisyui");


const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6B3E26",
          50: "#F9F0EB",
          100: "#F0DCCC",
          200: "#E0B999",
          300: "#C99067",
          400: "#B36D3F",
          500: "#6B3E26",
          600: "#5A3320",
          700: "#482819",
          800: "#371E13",
          900: "#26140D",
        },
        secondary: {
          DEFAULT: "#A97142",
          50: "#FBF4EC",
          100: "#F4E4CE",
          200: "#E8C89D",
          300: "#DCAC6C",
          400: "#C68D54",
          500: "#A97142",
          600: "#8E5E37",
          700: "#734B2C",
          800: "#583821",
          900: "#3D2516",
        },
        accent: {
          DEFAULT: "#D4A95A",
          50: "#FDF8EE",
          100: "#F8EDCE",
          200: "#F0DB9D",
          300: "#E8C96C",
          400: "#DCB945",
          500: "#D4A95A",
          600: "#B88C42",
          700: "#9C7034",
          800: "#805326",
          900: "#643718",
        },
        background: "#FFFDF8",
        surface: "#FFFFFF",
        border: {
          DEFAULT: "#EFE7DD",
          light: "#F7F2EC",
          dark: "#D4C4B4",
        },
        text: {
          DEFAULT: "#2D2D2D",
          muted: "#4E4E4E",
          light: "#636363",
        },
      },
      fontFamily: {
        heading: ["Playfair Display", "Georgia", "serif"],
        body: ["Poppins", "sans-serif"],
        button: ["Inter", "sans-serif"],
        sans: ["Poppins", "sans-serif"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out infinite 2s",
        "float-slow": "float 8s ease-in-out infinite 1s",
        "marquee": "marquee 25s linear infinite",
        "marquee-reverse": "marquee-reverse 25s linear infinite",
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "scale-in": "scaleIn 0.4s ease-out forwards",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-15px) rotate(2deg)" },
          "66%": { transform: "translateY(-8px) rotate(-2deg)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
      boxShadow: {
        "luxury": "0 4px 24px rgba(107, 62, 38, 0.12)",
        "luxury-lg": "0 8px 48px rgba(107, 62, 38, 0.16)",
        "luxury-xl": "0 16px 64px rgba(107, 62, 38, 0.20)",
        "card": "0 2px 12px rgba(0, 0, 0, 0.06)",
        "card-hover": "0 8px 32px rgba(0, 0, 0, 0.12)",
        "glow": "0 0 20px rgba(212, 169, 90, 0.4)",
        "glow-lg": "0 0 40px rgba(212, 169, 90, 0.3)",
        "inner-luxury": "inset 0 2px 8px rgba(107, 62, 38, 0.08)",
      },
      backgroundImage: {
        "luxury-gradient": "linear-gradient(135deg, #6B3E26 0%, #A97142 50%, #D4A95A 100%)",
        "warm-gradient": "linear-gradient(180deg, #FFFDF8 0%, #F5EDE0 100%)",
        "hero-gradient": "linear-gradient(135deg, rgba(107,62,38,0.85) 0%, rgba(169,113,66,0.7) 50%, rgba(212,169,90,0.5) 100%)",
        "card-gradient": "linear-gradient(180deg, transparent 0%, rgba(107,62,38,0.8) 100%)",
        "shimmer-gradient": "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
      },
      transitionTimingFunction: {
        "luxury": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "bounce-out": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      spacing: {
        "section": "5rem",
        "section-lg": "7rem",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [daisyui],
} as any;

// DaisyUI theme config (typed separately for TS compatibility)
(config as any).daisyui = {
  themes: [
    {
      nutriroots: {
        primary: "#6B3E26",
        secondary: "#A97142",
        accent: "#D4A95A",
        neutral: "#2D2D2D",
        "base-100": "#FFFDF8",
        "base-200": "#F5EDE0",
        "base-300": "#EFE7DD",
        info: "#3B82F6",
        success: "#4CAF50",
        warning: "#F59E0B",
        error: "#EF4444",
      },
    },
  ],
  base: true,
  styled: true,
  utils: true,
  logs: false,
};

export default config;

