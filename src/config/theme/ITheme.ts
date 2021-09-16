import { CSSProperties } from 'react';

interface Breakpoint {
	huge: string;
	large: string;
	medium: string;
	small: string;
	min: string;
}

interface Spacing {
	none: number;
	mini: CSSProperties['padding'];
	small: CSSProperties['padding'];
	normal: CSSProperties['padding'];
	medium: CSSProperties['padding'];
	large: CSSProperties['padding'];
	larger: CSSProperties['padding'];
	largest: CSSProperties['padding'];
}


// interface Dimension {
// 	height: CSSProperties['height'];
// }

interface Colors {
	primary: CSSProperties['color'];
	secondary: CSSProperties['color'];
	tertiary: CSSProperties['color'];
}

interface Device {
	mobileS: string;
	mobileM: string;
	mobileL: string;
	tablet: string;
	laptop: string;
	laptopL: string;
	desktop: string;
	desktopL: string;
}

export interface ITheme {
	colors: Colors;
	fontFamily: CSSProperties['fontFamily'];
	fontSizes: number[];
	spacing: Spacing;
	breakpoint: Breakpoint;
	mediaSizes?: Device;
}

