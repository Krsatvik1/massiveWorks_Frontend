/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js,ejs}","./*.{html,js,ejs}"],
  theme: {
    extend: {
      fontFamily: {
        'thunder' : 'Thunder',
        'instrument' : 'Instrument Serif',
      }
    },
  },
  plugins: [],
}

