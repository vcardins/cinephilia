import { ITheme } from './ITheme';

export const theme: ITheme = {
	colors: {
		primary: '#5566',
		secondary: '#5566',
		tertiary: '#5566',
	},
	fontFamily: '-apple-system, BlinkMacSystemFont, \'Segoe UI\', \'Roboto\', \'Oxygen\', \'Ubuntu\', \'Cantarell\', \'Fira Sans\', \'Droid Sans\', \'Helvetica Neue\', sans-serif',
	fontSizes: [12, 14, 16, 20, 24, 36, 48, 80, 96],
	spacing: {

		none: 0,
		mini: '0.25em',
		small: '0.5em',
		normal: '1em',
		medium: '1.5em',
		large: '2em',
		larger: '3em',
		largest: '4em',
	},
	breakpoint: {
		huge: '1440px',
		large: '1170px',
		medium: '768px',
		small: '450px',
		min: '320px',
	},
	mediaSizes: {
		mobileS: '320px',
		mobileM: '375px',
		mobileL: '425px',
		tablet: '768px',
		laptop: '1024px',
		laptopL: '1440px',
		desktop: '2560px',
		desktopL: '2560px',
	},
};
