/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["../../Cms/*.html", "../tailwindCss/node_modules/flowbite/**/*.js"],
  theme: {
    container: {
      center: "true"
    },
    extend: {
      boxShadow: {
        "main": "0px 1px 10px 0px rgba(0, 0, 0, 0.05)"
      },
      dropShadow: {
        'main': " 0px 0px 10px rgba(0, 0, 0, 0.40)"
      },
      spacing: {
        '25': '100px',
        '50': '200px'
      },
      fontFamily: {
        "IRANSans": "IRANSans"
      },
      backgroundColor: {
        black: {

          'dark': '#2A2C38',
        }
      },
      colors: {
        gray: {

          "primary": "#768392"
        },
        blue: {

          "primary": "#696CFF"
        },
        purple: {
          "primary": "#696CFF"
        },
        light: {
          primary: "#435971",
        }
      }
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('child', "& > *")
      addVariant('child-hover', "& > *:hover")
    },
    require('../tailwindCss/node_modules/flowbite/plugin')
  ],
};
