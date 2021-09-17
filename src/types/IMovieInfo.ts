export interface IMovieInfo {
	id: number;
	overview: string;
	posterPath: string;
	releaseDate: string;
	genreIds: number[];
	originalTitle: string;
	originalLanguage: string;
	title: string;
	backdropPath: string;
	popularity: number;
	voteCount: number;
	video: boolean;
	voteAverage: number;
}
