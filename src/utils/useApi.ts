const contentType = 'application/json';

const headers = new Headers({
	Accept: contentType,
	'Content-Type': contentType,
	'Access-Control-Allow-Origin': '*',
});

export const useApi = async <T>(url: string): Promise<T | undefined> => {
	const request = { method: 'GET', headers };
	// eslint-disable-next-line no-undef
	const promise = () => fetch(url, request);
	const response = await promise();

	switch (response.status) {
		case 403:
		case 404:
		case 500:
		case 400:
			const error = await response.json();
			throw new Error(error.message);
		case 401:
			throw new Error('Unauthorized');
		case 200:
		case 201:
		case 204:
			return await response.json() as unknown as T;
	}
};
