module.exports = {
  // content: ['./src/**/*.{html,js}', './node_modules/tw-elements/dist/js/**/*.js'],
  plugins: [
  ],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],

  theme: {
    extend: {
      fontFamily: {
        primary: ["var(--primary-font)"],
      },
      colors: {
        secondary: "var(--secondary-color)",
        primary: {
          DEFAULT: "var(--primary-color)",
          '50': '#B8CDFA',
          '100': '#A5C0F9',
          '200': '#7FA5F6',
          '300': '#598AF4',
          '400': '#3370F1',
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
    }
  },
  plugins: [],
}
