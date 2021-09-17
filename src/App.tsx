import { ThemeProvider } from 'styled-components';

import { globalStyle as GlobalStyle } from './styles';
import { theme } from './config/theme';
import { Gallery } from './app/Gallery';

export const App = () => (
	<ThemeProvider theme={theme}>
		<GlobalStyle />
		<Gallery/>
	</ThemeProvider>
);
