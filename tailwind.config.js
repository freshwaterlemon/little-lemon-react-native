/** @type {import('tailwindcss').Config} */
module.exports = {
	// NOTE: Update this to include the paths to all of your component files.
	content: [
		'./app/**/*.{js,jsx,ts,tsx}',
		'./components/**/*.{js,jsx,ts,tsx}',
		// './**/*.{js,jsx,ts,tsx}',
	],
	presets: [require('nativewind/preset')],
	theme: {
		extend: {
			colors: {
				'primary-green': '#495E57',
				'primary-yellow': '#F4CE14',
				'secondary-coral': '#EE9972',
				'secondary-peach': '#FBDABB',
				'highlight-grey': '#EDEFEE',
				'highlight-black': '#333333',
			},
		},
	},
	plugins: [],
};
