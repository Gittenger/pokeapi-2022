module.exports = {
	plugins: [
		require('cssnano'),
		require('postcss-import'),
		require('tailwindcss/nesting'),
		require('tailwindcss'),
		require('autoprefixer'),
	],
}
