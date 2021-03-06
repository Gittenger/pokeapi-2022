module.exports = {
  content: ['./src/**/*.{html,js,jsx}', './public/index.html'],
  theme: {
    screens: {
      'xs': '500px',
      'sm': '640px',
      'md': '870px',
      'lg': '1100px',
      'xl': '1280px',
      '2xl': '1640px',
    },
    extend: {
      colors: {
        'zinc': {
          '1000': '#070708',
        },
      },
      fontFamily: {
        body: ['Georama'],
        card: ['Yanone'],
        sansation: ['Sansation'],
        boismen: ['Boismen'],
        pokemon: ['Pokemon'],
        'pokemon-hollow': ['Pokemon-Hollow'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
