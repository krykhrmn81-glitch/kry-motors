/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      perspective: {
        '1000': '1000px',
      },
      keyframes: {
        'rotate-y': {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(6deg)' },
        },
      },
      animation: {
        'rotate-y': 'rotate-y 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
}