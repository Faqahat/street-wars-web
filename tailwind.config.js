/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}",   
  "./components/**/*.{js,ts,jsx,tsx}",  ],

  theme: {
    extend: {
      backgroundImage: {
        'hero': "url('/static/hero1.jpg')",
        'hero2': "url('/static/hero2.jpg')",
        'hero3': "url('/static/hero3.jpg')",
        'hero4': "url('/static/hero4.jpg')",

    }
    },
  },
  plugins: [],
}
