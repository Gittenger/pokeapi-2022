module.exports = {
  content: ['./src/**/*.{html,js,jsx}', './public/index.html'],
  theme: {
    screens: {
      'sm': '640px',
      'md': '850px',
      'lg': '1100px',
      'xl': '1280px',
      '2xl': '1640px',
    },
    extend: {
      fontFamily: {
        body: ['Georama'],
        pokemon: ['Pokemon'],
        'pokemon-hollow': ['Pokemon-Hollow'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
