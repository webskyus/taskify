import { FC } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaSquareGithub } from 'react-icons/fa6';
import { Button } from '~/shared/ui/button';
import { AUTH_TYPE } from '~/shared/types/auth';
import { AUTH_TEXT } from '~/shared/lib/utils/static';
import { SupabaseClient } from '@supabase/supabase-js';
import { useOutletContext } from '@remix-run/react';
import {
	signInWithGithubOAuthApi,
	signInWithGoogleOAuthApi,
} from '~/features/auth/oauth';

interface Props {
	authType: AUTH_TYPE;
	url: string;
}

const Auth: FC<Props> = props => {
	const { authType, url } = props;
	const { supabase } = useOutletContext<{
		supabase: SupabaseClient;
	}>();

	const handleSignInWithGoogle = async () =>
		signInWithGoogleOAuthApi(supabase, url);

	const handleSignInWithGitHub = async () =>
		signInWithGithubOAuthApi(supabase, url);

	return (
		<section className={'max-w-md m-auto shadow-2xl p-4 rounded'}>
			<h1 className={'text-4xl mb-4 font-bold text-foundation-primary-500'}>
				{AUTH_TEXT[authType].title}
			</h1>
			<p className={'text-xl mb-4 text-foundation-secondary-400'}>
				{AUTH_TEXT[authType].description}
			</p>

			<Button
				variant={'secondary'}
				className={'w-[100%] mb-1'}
				onClick={handleSignInWithGoogle}>
				<FcGoogle size={24} className={'mr-2'} />
				{AUTH_TEXT[authType].auth_google}
			</Button>

			<Button
				variant={'secondary'}
				className={'w-[100%]'}
				onClick={handleSignInWithGitHub}>
				<FaSquareGithub size={24} className={'mr-2'} />
				{AUTH_TEXT[authType].auth_github}
			</Button>
		</section>
	);
};

export { Auth };
