import React, { ChangeEvent } from 'react';
import styled, { css } from 'styled-components';

const PageLink = styled.span<{ disabled: boolean }>`
	padding: 0.25em 0.5em;
	border-radius: 2px;

	${({ disabled = false }) => disabled
		? css`
			color: #bbb;
		`
		: css`
			cursor: pointer;
			:hover {
				background-color: #eee;
			}
		` };
`;

const PaginatorContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
`;

const PageSelector = styled.span`
	margin: 0 0.5em;
	line-height: 2;
`;

const Select = styled.select`
	margin: 0 0.5em;
`;

interface IPaginatorProps {
	totalPages: number;
	currentPage: number;
	onPageChange: (page: number) => void
}

export function Paginator ({ currentPage, totalPages, onPageChange }: IPaginatorProps): React.ReactElement<any> {
	let pageSelector = <div>No records</div>;

	if (totalPages > 0) {
		pageSelector = (
			<>
				<PageLink disabled={currentPage === 1} onClick={() => currentPage > 1 && onPageChange(1)}>|← First</PageLink>
				<PageLink disabled={currentPage <= 1} onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}> ← Prev</PageLink>
				<PageSelector>
					<span>Page</span>
					<Select
						onChange={({ target: { value } }: ChangeEvent<HTMLSelectElement>) => onPageChange(Number(value))}
					>
						{ Array.from({ length: totalPages }, (_, index) => {
							const value = index + 1;
							return (
								<option key={value} value={value} selected={currentPage === value}>{value}</option>
							);
						}) }
					</Select>
					<span>of { totalPages }</span>
				</PageSelector>
				<PageLink disabled={currentPage >= totalPages} onClick={() => currentPage < totalPages &&  onPageChange(currentPage + 1)}>Next →</PageLink>
				<PageLink disabled={currentPage === totalPages} onClick={() => currentPage < totalPages &&  onPageChange(totalPages)}>Last →|</PageLink>
			</>
		);
	}

	return (
		<PaginatorContainer>
			{ pageSelector }
		</PaginatorContainer>
	);
}
