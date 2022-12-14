/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./layout/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				purple: "#603BAD",
				lightpurple: "#BFB1DE",
			},
			fontFamily: {
				quicksand: ["Quicksand", "sans-serif"],
				nunito: ["Nunito", "sans-serif"],
			},
		},
	},
	plugins: [],
};
