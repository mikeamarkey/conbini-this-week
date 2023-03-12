/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'src/app/**/*.{js,ts,jsx,tsx}',
    'src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      aspectRatio: {
        '6/5': '6 / 5',
      },
      fontFamily: {
        sans: [
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
        ],
      },
      fontSize: {
        '4xl': ['2.25rem', '1.5'],
        '5xl': ['3rem', '1.5'],
      },
    },
  },
  plugins: [],
}
