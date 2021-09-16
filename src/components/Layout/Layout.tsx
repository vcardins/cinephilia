import React from 'react';
import styled from 'styled-components';

import logo from './logo.svg';

const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: calc(10px + 2vmin);
	color: white;
	flex: 1;
`;


const Body = styled.div`
	align-items: center;
	justify-content: center;
	font-size: calc(10px + 2vmin);
	color: white;
	flex: 1;
`;

const Logo = styled.img.attrs({ src: logo, alt: 'Logo' })`
	height: 40vmin;
	pointer-events: none;
`;

const Wrapper = styled.div`
	text-align: center;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	background-color: #282c34;

	@media (prefers-reduced-motion: no-preference) {
	${Logo} {
		animation: spin infinite 10s linear;
	}
}
`;

interface ILayoutProps {
	children: React.ReactNodeArray;
}

export function Layout({ children }: ILayoutProps ) {
	return (
		<Wrapper>
			<Header>
				<Logo />
			</Header>
			<Body>
				{ children }
			</Body>
		</Wrapper>
	);
}
