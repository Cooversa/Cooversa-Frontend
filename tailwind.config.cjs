const disabledCss = {
	'code::before': null,
	'code::after': null,
	'blockquote p:first-of-type::before': null,
	'blockquote p:last-of-type::after': null,
	pre: null,
	code: null,
	'pre code': null,
	'code::before': null,
	'code::after': null
};

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				gilmer: ['Gilmer', 'sans-serif'],
				besley: ['Besley', 'serif'],
				jakarta: ['Plus Jakarta Sans', 'sans-serif']
			},
			colors: {
				primary: '#5C57FF',
				secondary: '#FED924',
				tetiary: '#E9CA32',
				foundationalBlack: '#575759',
				darkBg: '#0B0A26',
				success: '#22C55E',
				grey: {
					100: '#F5F7FA',
					1000: '#1F2933'
				}
			},
			components: {
				customCard:
					'shadow-md p-[1.875rem] flex flex-col items-start gap-[0.625rem] w-[22.875rem] h-[16.5rem]'
			}
		}
	}
};
