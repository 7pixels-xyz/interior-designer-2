import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './sections/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['var(--font-playfair)', 'serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          offblack: "#111111",
          charcoal: "#2A2A2A",
          bone: "#FAFAF8",
          taupe: "#C2BCB1",
          muted: "#8C8881",
          border: "rgba(17, 17, 17, 0.1)"
        }
      },
    },
  },
  plugins: [],
}

export default config
