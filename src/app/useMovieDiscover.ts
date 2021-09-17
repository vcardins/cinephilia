import { useCallback, useMemo, useState } from 'react';

import { useApi } from '../utils';
import { API_URL, PAGE_SIZE } from '../config';
import { IApiResponse, IMovieInfo, MovieFilter } from '../types';

interface IPagination<T> {
	page: number;
	pageSize: number;
	totalItems: number;
	totalPages: number;
	results: T[];
}

export const useMovieDiscover = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [pagination, setPagination] = useState<IPagination<IMovieInfo>>({
		page: 1,
		pageSize: PAGE_SIZE,
		totalItems: 0,
		totalPages: 0,
		results: [],
	});

	const [filters, setFilters] = useState<MovieFilter>({});

	const handleSearch = useCallback(async (page: number) => {
		try {
			const filterKeys = Object.keys(filters);
			if (!filterKeys.length) return;

			const qs = filterKeys.reduce((result, key) => {
				if (filters[key]?.toString()?.length > 0) {
					// eslint-disable-next-line no-param-reassign
					result += `&${key}=${filters[key]}`;
				}
				return result;
			}, '');

			const url = `${API_URL}${qs}&page=${page}&sort_by=vote_count.asc`;

			setIsLoading(true);
			const response = await useApi<IApiResponse<IMovieInfo>>(url);
			setIsLoading(false);

			if (response) {
				setPagination((prevState) => ({
					...prevState,
					page,
					results: response.results || [],
					totalItems: response.total_results,
					totalPages: response.total_pages,
				}));
			}
		}
		catch (e) {

		}
	}, [filters]);

	const handleUpdateFilter = (key: string, value: string | number | boolean) => {
		setFilters((prevState) => ({ ...prevState, [key]: value }));
	};

	return useMemo(() => ({
		isLoading,
		pagination,
		onSearch: handleSearch,
		filters,
		onFilterUpdate: handleUpdateFilter,
	}), [filters, pagination, handleSearch, handleUpdateFilter]);
};

export type IUseMovieDiscover = ReturnType<typeof useMovieDiscover>;
