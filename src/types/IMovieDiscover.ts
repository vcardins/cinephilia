export interface IMovieDiscover {
	key: string;
	label: string;
	type: 'boolean' | 'text' | 'number' | 'date';
	isRange?: boolean;
	isActive?: boolean;
}
