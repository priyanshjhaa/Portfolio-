import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Background
        gta: {
          DEFAULT: '#0E0E0E',
          top: '#0C0C0C',
          bottom: '#151515',
        },
        // Accent - muted green
        accent: {
          DEFAULT: '#4CAF50',
          hover: '#55B859',
          subtle: 'rgba(76, 175, 80, 0.1)',
          border: 'rgba(76, 175, 80, 0.2)',
        },
        // Text colors
        text: {
          primary: '#EDEDED',
          secondary: '#D1D5DB',
          muted: '#98A2B3',
        },
      },
      fontFamily: {
        sans: ['"Avenir Next"', '"Segoe UI"', 'system-ui', 'sans-serif'],
        display: ['Rajdhani', '"Avenir Next Condensed"', '"Arial Narrow"', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.25s ease-out',
      },
      keyframes: {
        fadeUp: {
          'from': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        shimmer: {
          '0%, 100%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(100%)' },
        },
      },
      backgroundImage: {
        'gradient-vertical': 'linear-gradient(to bottom, #0C0C0C, #151515)',
        'noise': "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.05%22/%3E%3C/svg%3E')",
      },
    },
  },
  plugins: [],
};

export default config;
