import { ChangeEvent, useMemo, useState } from 'react';
import styled, { css } from 'styled-components';

import { useMovieDiscover, IUseMovieDiscover } from './useMovieDiscover';

import { availableFilters } from '../config/filters';

import { Field, FieldSet, InputTypes, MovieCard, Paginator, Modal, MovieDetails } from '../components';
import { IMovieDiscover, IMovieInfo } from '../types';

const FilterBar = styled.div`
	border-right: 1px solid #ddd;
	overflow: auto;
	padding: 1em;
`;

const Button = styled.button`
	font-size: 12px;
	font-weight: bold;
	height: 25px;
`;

const SearchForm = styled.form`
	display: grid;
`;

const Body = styled.div`
	overflow: hidden;
	display: grid;
	grid-template-rows: 1fr 50px;
	grid-template-areas: 'gallery' 'pagination';
`;

const Pagination = styled.div`
	grid-area: pagination;
`;

const MoviesGrid = styled.div<{ height?: number; width?: number }>`
	grid-area: gallery;
	overflow: auto;
	padding: 2em;
	height: 100%;
	display: grid;
	grid-gap: 1em;
	${({ width = 180, height = 270 }) => css`
		grid-template-columns: repeat( auto-fit, minmax(${width}px, 1fr));
		grid-auto-rows: ${height}px;
	`}
	grid-auto-flow: dense;
	box-shadow:
		inset 0px 11px 8px -10px #eee,
		inset 0px -11px 8px -10px #eee;
`;

const Wrapper = styled.div`
	height: 100vh;
	display: grid;
	overflow: hidden;

	@media (min-width: 769px) {
		grid-template-columns: 225px auto;
		${SearchForm} {
			grid-template-rows: repeat(auto-fit, minmax(50px, 1fr));
			${Button} {
				margin-top: 1em;
			}
		}
	}

	@media (max-width: 769px) {
		grid-template-rows: 80px auto;
		${SearchForm} {
			grid-gap: 10px;
			grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
			${FieldSet} {
				margin-bottom: 0.5em;
				justify-content: flex-end;
			}
		}
	}
`;

interface IBuildFilters {
	showAllAvailableFilters?:boolean;
	filters: IUseMovieDiscover['filters'];
	onFilterUpdate: IUseMovieDiscover['onFilterUpdate'];
}

function buildFilters({ filters, showAllAvailableFilters, onFilterUpdate }: IBuildFilters) {
	const handleFilterUpdate = ({ target }: ChangeEvent<HTMLInputElement>) => {
		onFilterUpdate(target.name, target.type === 'checkbox' ? target.checked : target.value);
	};

	const buildField = (field: Omit<IMovieDiscover, 'key' | 'type'> & { name: string; type: InputTypes }) => (
		<Field
			{...field}
			key={field.name}
			value={filters[field.name] as string || ''}
			onChange={handleFilterUpdate}
		/>
	);

	return availableFilters
		.filter(({ isActive }) => showAllAvailableFilters ? true : isActive)
		.map(({ key, label, type, isRange }) => {
			const baseProps = { key, name: key, type: type === 'boolean' ? 'checkbox' : type as InputTypes, label };

			if (!isRange) {
				return buildField(baseProps);
			}

			return (
				<div key={baseProps.name}>
					{ buildField({ ...baseProps, name: `${baseProps.name}.gte`, label: `${baseProps.label} Start` }) }
					{ buildField({ ...baseProps, name: `${baseProps.name}.lte`, label: `${baseProps.label} End` }) }
				</div>
			);
		});
}

export function Gallery() {
	const [selectedMovie, setSelectedMovie] = useState<IMovieInfo | null>(null);
	const [showAllAvailableFilters, setShowAllAvailableFilters] = useState<boolean>(false);
	const { filters, onFilterUpdate, onSearch, isLoading, pagination } = useMovieDiscover();
	const filtersFields = useMemo(() => buildFilters({ filters, showAllAvailableFilters, onFilterUpdate }), [filters, onFilterUpdate]);
	let content;

	if (!isLoading) {
		if (!pagination.results.length) {
			content = <span>No results found</span>;
		}
		else {
			content = pagination.results.map((item) =>
				<MovieCard {...item} key={item.id} onClick={() => setSelectedMovie(item)} />,
			);
		}
	}
	else {
		content = <span>Loading ...</span>;
	}

	return (
		<Wrapper>
			<FilterBar>
				<SearchForm>
					<Field
						name="allAvailableFilters"
						key="allAvailableFilters"
						type="checkbox"
						label="Display all available filters"
						checked={showAllAvailableFilters}
						onChange={({ target: { checked } }: ChangeEvent<HTMLInputElement>) => setShowAllAvailableFilters(checked)}
					/>
					{ filtersFields }
					<Button type="button" disabled={!Object.keys(filters).length} onClick={() => onSearch(pagination.page)}>
						Search
					</Button>
				</SearchForm>
			</FilterBar>
			<Body>
				<MoviesGrid>
					{ content }
				</MoviesGrid>
				<Pagination>
					<Paginator
						currentPage={pagination.page}
						totalPages={pagination.totalPages}
						onPageChange={onSearch}
					/>
				</Pagination>
			</Body>
			<Modal
				isOpen={!!selectedMovie}
				onClose={() => setSelectedMovie(null)}
			>
				{ selectedMovie ? <MovieDetails {...selectedMovie} /> : null }
			</Modal>
		</Wrapper>
	);
}
