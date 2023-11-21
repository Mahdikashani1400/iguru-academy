/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["../../Cms/*.html"],
  theme: {
    extend: {
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
        }
      }
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('child', "& > *")
      addVariant('child-hover', "& > *:hover")
    }
  ],
};
