const BASE_API_URL = 'https://api.themoviedb.org/3/';
const SEARCH_ENDPOINT = 'discover/movie';
const API_KEY = '050d0852e04ffcc82223c1bf04b7ae5c';

export const PAGE_SIZE = 20;
export const API_URL = `${BASE_API_URL}${SEARCH_ENDPOINT}?api_key=${API_KEY}`;
export const getImageUrl = (size: number, path: string) =>
	`https://image.tmdb.org/t/p/w${size > 0 ? size : 'original'}/${path}`;
