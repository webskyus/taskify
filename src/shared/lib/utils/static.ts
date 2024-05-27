import { AUTH_TYPE } from '~/shared/types/auth';
import { ROUTES } from '~/shared/lib/utils/urls';

type AuthTextType = {
	title: string;
	description: string;
	auth_google: string;
	auth_github: string;
};

type LandingTextType = {
	title: string;
	description: string;
	auth_button: string;
};

type HeaderAuthLinkTextType = {
	title: string;
	url: ROUTES;
};

export const HEADER_TEXT = {
	[AUTH_TYPE.SIGN_IN]: 'Log in',
	[AUTH_TYPE.SIGN_UP]: 'Get Plan.io free',
};

export const AUTH_TEXT: Record<AUTH_TYPE, AuthTextType> = {
	[AUTH_TYPE.SIGN_IN]: {
		title: 'Login',
		description: 'Sign in if you already have an account.',
		auth_google: 'Log in with Google',
		auth_github: 'Log in with GitHub',
	},
	[AUTH_TYPE.SIGN_UP]: {
		title: 'Sign up',
		description: 'Create an account and start using plan.io',
		auth_google: 'Sign up with Google',
		auth_github: 'Sign up with GitHub',
	},
};

export const LANDING_TEXT: LandingTextType = {
	title: 'Your 📕 wiki,📋 docs, & 🎯 projects. Together.',
	description:
		'Plan.io is the connected workspace where better, faster work happens.',
	auth_button: 'Get Plan.io free',
};

export const HEADER_AUTH_LINK_TEXT: Record<AUTH_TYPE, HeaderAuthLinkTextType> =
	{
		[AUTH_TYPE.SIGN_UP]: {
			title: 'Have account? Sign in',
			url: ROUTES.SIGN_IN,
		},
		[AUTH_TYPE.SIGN_IN]: {
			title: 'Create an account',
			url: ROUTES.SIGN_UP,
		},
	};
