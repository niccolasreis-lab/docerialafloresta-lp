import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        raspberry: "#9D1E3D",
        cream: "#FFF7E8",
        cocoa: "#43251D",
        gold: "#EFAE32",
      },
      fontFamily: { display: ["Georgia", "serif"], body: ["Arial", "sans-serif"] },
    },
  },
  plugins: [],
};

export default config;
