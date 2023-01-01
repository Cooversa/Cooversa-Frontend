/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        gilmer: ['Gilmer', 'sans-serif'],
        besley: ['Besley', 'serif'],
      },
      colors: {
        primary: '#5C57FF',
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
  ],
}
