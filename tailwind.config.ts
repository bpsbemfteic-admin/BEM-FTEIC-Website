import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Palet diambil dari logo BEM FTEIC (biru petrol, emas, magenta).
      colors: {
        "brand-blue": "#246C84",
        "brand-deep": "#17495A",
        "brand-night": "#0E2F3B",
        "brand-light-blue": "#E7F1F4",
        "brand-gold": "#E4B43C",
        "brand-gold-bright": "#FCCC3C",
        "brand-magenta": "#B43C6C",
        "input-grey": "#D9D9D9",
        "link-blue": "#1F6F8B",
      },
      borderRadius: {
        "auth-card": "15px",
        "auth-input": "8px",
      },
      backgroundImage: {
        "auth-gradient": "linear-gradient(to bottom, #0E2F3B 0%, #246C84 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
