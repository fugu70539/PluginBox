import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ios: {
          bg: "#000000",
          card: "rgba(255, 255, 255, 0.08)",
          border: "rgba(255, 255, 255, 0.1)",
        },
      },
      borderRadius: {
        'ios': '2.2rem',
      }
    },
  },
  plugins: [],
};
export default config;
