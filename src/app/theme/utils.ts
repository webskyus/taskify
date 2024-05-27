import { SerializeFrom } from '@remix-run/node';
import { useRouteLoaderData } from '@remix-run/react';
import { type loader as rootLoader } from '~/root';

export const useRequestInfo = () => {
	const data = useRouteLoaderData('root') as SerializeFrom<typeof rootLoader>;
	return data.theme.requestInfo;
}

export const useHints = () => {
	const requestInfo = useRequestInfo();
	return requestInfo.hints;
}

export enum Theme {
	DARK = 'dark',
	LIGHT = 'light',
	SYSTEM = 'system',
}

export const themes: Array<Theme> = Object.values(Theme);

export const isTheme = (value: unknown): value is Theme => {
	return typeof value === 'string' && themes.includes(value as Theme);
}
