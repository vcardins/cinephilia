import { createGlobalStyle } from 'styled-components';
import { theme } from './config/theme';

const { fontFamily, colors, fontSizes } = theme;

export const globalStyle = createGlobalStyle`
	::-webkit-scrollbar-track {
		background-color: ${colors.secondary};
	}

	::-webkit-scrollbar {
		width: 0.5em;
	}

	::-webkit-scrollbar-thumb {
		background-color: ${colors.secondary};
	}

	* {
		padding: 0;
		margin: 0;
		line-height: inherit;
		font-family: inherit;
		font-size: inherit;
		box-sizing: border-box;
		-webkit-font-smoothing: antialiased;
	}

	html {
		line-height: 1.5;
		font-family: ${fontFamily};
		font-size: ${fontSizes[0]}px;
		box-sizing: border-box;

		a {
			color: inherit;
			text-decoration: none;
			color: #61dafb;
		}
	}

	/* wrapping these attributes with @media screen so printing is not affected */
	@media screen {
		html,
		body {
			height: 100vh;
			width: 100vw;
			overflow: hidden;
		}
	}

	#root {
		height: 100vh;
	}

	[disabled] {
		input,
		textarea,
		select,
		button {
			cursor: not-allowed;
		}
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
`;
