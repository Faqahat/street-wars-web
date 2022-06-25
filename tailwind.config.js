/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}",   
  "./components/**/*.{js,ts,jsx,tsx}",  ],

  theme: {
    extend: {
      colors:
      {
        brand:"#0fa9e6",
      },
     
      fontFamily:
      {
        'Grotesk': 'Grotesk-wide'
      },

      fontFamily:
      {
        'Archivo': 'Archivo Black'
      },
      fontFamily:
      {
        'TimesNewRoman':'TimesNewRoman'
      }

    },
  },
  plugins: [ require('tailwind-scrollbar')],
}
