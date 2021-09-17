export interface IMovieInfo {
	id: number;
	overview: string;
	poster_path: string;
	release_date: string;
	genre_ids: number[];
	original_title: string;
	original_language: string;
	title: string;
	backdrop_path: string;
	popularity: number;
	vote_count: number;
	video: boolean;
	vote_average: number;
}
