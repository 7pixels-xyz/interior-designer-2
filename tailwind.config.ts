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
        'bg-primary': '#F9F8F6',
        'bg-secondary': '#EBE6E0',
        'text-main': '#1A1A1A',
        'text-muted': '#6B6B6B',
        accent: '#8A735E',
        'footer-bg': '#3A3532',
      },
    },
  },
  plugins: [],
}

export default config
