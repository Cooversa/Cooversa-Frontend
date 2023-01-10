const disabledCss = {
  'code::before': null,
  'code::after': null,
  'blockquote p:first-of-type::before': null,
  'blockquote p:last-of-type::after': null,
  pre: null,
  code: null,
  'pre code': null,
  'code::before': null,
  'code::after': null,
}


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
        grey: {
          100: "#F5F7FA",
          1000: "#1F2933"
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
  ],
}
