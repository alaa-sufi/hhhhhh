const plugin = require("tailwindcss/plugin");
const nextOnChecked = plugin(function ({ addVariant, e }) {
  addVariant('nextOnChecked', ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.${e(`nextOnChecked${separator}${className}`)}:checked + *`;
    })
  });
});
module.exports = {
  // content: ['./src/**/*.{html,js}', './node_modules/tw-elements/dist/js/**/*.js'],
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],

  theme: {
    extend: {
     
      zIndex: {
        '1': '1',
        '2': '2'
            },
      backgroundColor: ['dark'],
      textColor: ['dark'],
      fontFamily: {
        primary: ["var(--primary-font)"],
      },
      
      colors: {
        secondary: "var(--secondary-color)",
        primary: {
          DEFAULT: "var(--primary-color)",
          '50': '#B8CDFA',
          '100': '#A5C0F9',
          '200': '#D69FFF',
          '300': '#e5deea',
          '400': '#aa8fdd',
          '500': '#1056EB',
          '600': '#0C43B6',
          '700': '#093082',
          '800': '#051C4D',
          '900': '#020919'
        },
      },
      fontSize: {
        'h2':["var(--h2-size)"]
      },
      letterSpacing: {
        widest2: '0.2em',
        widest3: '0.3em',
      }
    }
  },
  variants: {
    extend: {
      border: ['nextOnChecked'],
      backgroundColor: ['nextOnChecked'],
      text: ['nextOnChecked'],
    },
  },
  plugins: [
    nextOnChecked
  ],
}
