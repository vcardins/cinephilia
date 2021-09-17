import React from 'react';
import styled from 'styled-components';

import { IMovieInfo } from '../../types';
import { getImageUrl } from '../../config';

const MovieCardContainer = styled.div`
	border-radius: 4px;
	outline: none;
	box-shadow: 0 1px 3px #e0baba1e, 0 1px 2px rgba(0,0,0,0.24);
	transition: all 0.3s cubic-bezier(.25,.8,.25,1);
	display: flex;
	flex-direction: column;
	background-repeat: no-repeat;
	background-size: contain;
	background-position: center;

	&:hover {
		cursor: pointer;
		box-shadow: 0 7px 30px -10px rgba(150,170,180,0.5);
	}
`;

const MovieDetails = styled.div`
	margin-top: auto;
	background: rgba(255, 255, 255, 0.9);
`;

const MovieTitle = styled.div`
	padding: 0.5em 0.5em 0;
	font-weight: bold;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const MovieRating = styled.div`
	padding: 0 0.5em;
	font-size: 11px;
`;

export function MovieCard (props: IMovieInfo & { onClick: () => void }): React.ReactElement<any> {
	const { id, title, posterPath, backdropPath, voteAverage, popularity, onClick } = props;
	const poster = posterPath ?? backdropPath
		? getImageUrl(200, posterPath ?? backdropPath)
		: 'https://static.thenounproject.com/png/1174579-200.png';

	return (
		<MovieCardContainer id={`movie-${id}`} onClick={onClick} style={{ backgroundImage: `url(${poster})` }}>
			<MovieDetails>
				<MovieTitle title={title}>{title}</MovieTitle>
				<MovieRating>Popularity: {popularity}</MovieRating>
				<MovieRating>Rating: {voteAverage}</MovieRating>
			</MovieDetails>
		</MovieCardContainer>
	);
}
