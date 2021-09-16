import React from 'react';

import { ThemeProvider } from 'styled-components';

import { globalStyle as GlobalStyle } from './styles';
import { theme } from './config/theme';
import { Layout } from './components';

export function App() {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<Layout>
				<p>
					Edit <code>src/Layout.tsx</code> and save to reload.
				</p>
				<a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
					Learn React
				</a>
			</Layout>
		</ThemeProvider>
	);
}
