/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playfairDisplay: [ 'Playfair Display', 'serif']
      } ,
      colors: {
        custom: {
          'color1': '#FFFFFF',
          'color2': ' #9DA6C5 ',
          'color3': '#57648C ',
        },
      },
    },
    screens: {
      xs: '480px',
      sm: '768px',
      md: '1060px',
    }
  },
  plugins: [],
}

