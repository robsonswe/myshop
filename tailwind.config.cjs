/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        // Complex site-specific row configuration
        'layout': 'min-content 1fr min-content',
      }
    }
,
  },
  plugins: [],
}