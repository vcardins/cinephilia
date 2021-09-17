import React from 'react';
import styled from 'styled-components';

import { IMovieInfo } from '../../types';
import { getImageUrl } from '../../config';

const MovieDetailsContainer = styled.div`
	outline: none;
	display: grid;
	overflow: hidden;

	@media (min-width: 769px) {
		grid-template-columns: 400px 350px;
		grid-template-rows: 600px auto;
	}

	@media (max-width: 769px) {
		grid-template-rows: 540px 300px;
	}
`;

const MoviePoster = styled.div`
	background-repeat: no-repeat;
	background-size: contain;
`;

const MovieInfo = styled.div`
	padding: 1em;
`;

const MovieTitle = styled.div`
	font-size: 1.75em;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	> :first-child {
		font-weight: bold;
		margin-right: 0.25em;
	}
`;

const MovieOverview = styled.div`
	overflow: auto;
	h2 {
		margin: 1em 0;
	}
	section {
		font-size: 12px;
	}
`;

export function MovieDetails (props: IMovieInfo): React.ReactElement<any> {
	const { id, title, poster_path, backdrop_path, release_date, original_title, overview } = props; // popularity, vote_average,
	const poster = poster_path ?? backdrop_path
		? getImageUrl(400, poster_path ?? backdrop_path)
		: 'https://static.thenounproject.com/png/1174579-200.png';
	const year = release_date?.split('-')?.[0];

	return (
		<MovieDetailsContainer id={`movie-detail-${id}`}>
			<MoviePoster style={{ backgroundImage: `url(${poster})` }} />
			<MovieInfo>
				<MovieTitle title={title}>
					<span>{title}</span>
					<span title={release_date}>({year})</span>
				</MovieTitle>
				<span>Original title: {original_title}</span>
				<MovieOverview>
					<h2>Overview</h2>
					<section>{overview}</section>
				</MovieOverview>
			</MovieInfo>
		</MovieDetailsContainer>
	);
}
