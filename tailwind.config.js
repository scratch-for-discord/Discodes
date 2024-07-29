import defaultTheme from "tailwindcss/defaultTheme"

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			fontFamily: {
				varela: ["Varela Round", ...defaultTheme.fontFamily.serif]
			}
		}
	},
	plugins: [/* require("daisyui") */],
};
