import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fillNode: {
          "0%": {
            fill: "sky",
          },
          "25%": {
            fill: "sky",
          },
          "50%": {
            fill: "orange",
          },
          "75%": {
            fill: "green",
          },
          "100%": {
            fill: "orange",
          },
        },
      },
      animation: {
        "animate-fill": "fillNode 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
