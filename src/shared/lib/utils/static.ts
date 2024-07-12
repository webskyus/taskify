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

type CreatedDialogItemType = {
	title: string;
	description: string;
};

type WorkspaceTextType = {
	title: string;
	description: string;
};

type ProjectTextType = WorkspaceTextType;

enum CREATED_PAGE_TYPE {
	WORKSPACE = 'Workspace',
	PROJECT = 'Project',
}

const HEADER_TEXT = {
	[AUTH_TYPE.SIGN_IN]: 'Log in',
	[AUTH_TYPE.SIGN_UP]: 'Get Taskify free',
};

const AUTH_TEXT: Record<AUTH_TYPE, AuthTextType> = {
	[AUTH_TYPE.SIGN_IN]: {
		title: 'Login',
		description: 'Sign in if you already have an account.',
		auth_google: 'Log in with Google',
		auth_github: 'Log in with GitHub',
	},
	[AUTH_TYPE.SIGN_UP]: {
		title: 'Sign up',
		description: 'Create an account and start using Taskify',
		auth_google: 'Sign up with Google',
		auth_github: 'Sign up with GitHub',
	},
};

const LANDING_TEXT: LandingTextType = {
	title:
		'♻️ Relabel, 🚀 Move, <br/> 🔄 Modify, 📂 Archive and Many more operations.',
	description:
		'Experience seamless project management with our Trello-inspired platform, Taskify. Organize tasks, collaborate with ease, and boost productivity starting today.',
	auth_button: 'Get Taskify free',
};

const HEADER_AUTH_LINK_TEXT: Record<AUTH_TYPE, HeaderAuthLinkTextType> = {
	[AUTH_TYPE.SIGN_UP]: {
		title: 'Have account? Sign in',
		url: ROUTES.SIGN_IN,
	},
	[AUTH_TYPE.SIGN_IN]: {
		title: 'Create an account',
		url: ROUTES.SIGN_UP,
	},
};

const CREATE_DIALOG_TEXT: Record<CREATED_PAGE_TYPE, CreatedDialogItemType> = {
	[CREATED_PAGE_TYPE.WORKSPACE]: {
		title: 'Create new workspace',
		description: 'You can create a workspace where you can set up projects.',
	},
	[CREATED_PAGE_TYPE.PROJECT]: {
		title: 'Create new project',
		description: 'You can create new project and start using Taskify board',
	},
};

const WORKSPACE_TEXT: WorkspaceTextType = {
	title: 'Workspaces',
	description:
		'You can select your workspace to manage and choose or create project on next step.',
};

const PROJECT_TEXT: ProjectTextType = {
	title: 'Projects',
	description: 'You can select your project to manage and choose',
};

export {
	HEADER_TEXT,
	HEADER_AUTH_LINK_TEXT,
	LANDING_TEXT,
	AUTH_TEXT,
	CREATED_PAGE_TYPE,
	CREATE_DIALOG_TEXT,
	WORKSPACE_TEXT,
	PROJECT_TEXT,
};
