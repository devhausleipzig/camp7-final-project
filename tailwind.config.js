/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./layout/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		boxShadow: {
			bottomRight: "4px 4px 0px 0px rgba(88, 168, 92, 1)",
			bottomRightDarker: "4px 4px 0px 0px rgba(5, 96, 3, 1)",
		},
		extend: {},
	},
	plugins: [],
};
