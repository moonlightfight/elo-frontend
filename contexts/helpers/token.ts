export const setToken = (token: string): void => {
	localStorage.setItem('mlf-token', token);
};

export const getToken = (): string | null => {
	return localStorage.getItem('mlf-token');
};

export const removeToken = (): void => {
	localStorage.removeItem('mlf-token');
}