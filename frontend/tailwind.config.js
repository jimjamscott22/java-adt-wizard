/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'surface-50': '#f6f8fb',
        'surface-100': '#ebf1f7',
        'surface-200': '#dde8f3',
        'surface-300': '#c9d8e8',
        'surface-400': '#b0c4d9',
        'surface-500': '#8ea9c3',
        'surface-600': '#4a6884',
        'surface-700': '#314a63',
        'surface-750': '#273f56',
        'surface-800': '#1f3347',
        'surface-900': '#142538',
        'surface-950': '#0a1726',
        'surface-custom': '#0a1726',
        'primary-400': '#34d1bf',
        'primary-500': '#1bb8a7',
        'primary-600': '#128b7f',
        'primary-700': '#0f6f65',
        'primary-800': '#0b5951',
        
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
