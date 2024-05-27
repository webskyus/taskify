import * as cookie from 'cookie';

const cookieName = 'theme';
type Theme = 'light' | 'dark' | undefined;

// Returns the cookie value set by server
export const getTheme = (request: Request): Theme => {
	const cookieHeader = request.headers.get('Cookie');
	const parsed = cookieHeader && cookie.parse(cookieHeader)[cookieName];

	if (parsed === 'light' || parsed === 'dark') return parsed;

	return undefined;
};

// Cookie value set by the server
export const setTheme = (theme?: Theme) => {
	if (theme) {
		return cookie.serialize(cookieName, theme, { path: '/' });
	} else {
		return cookie.serialize(cookieName, '', { path: '/', maxAge: 0 });
	}
};
