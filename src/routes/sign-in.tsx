import {
	json,
	LoaderFunctionArgs,
	MetaFunction,
	redirect,
} from '@remix-run/node';
import { AuthHeader } from '~/widgets/auth-header';
import { Auth } from '~/features/auth/oauth';
import { AUTH_TYPE } from '~/shared/types/auth';
import { getSupabaseWithSessionAndHeaders } from '~/app/supabase/supabase.server';
import { ROUTES } from '~/shared/lib/utils/urls';
import { useLoaderData } from '@remix-run/react';

export const meta: MetaFunction = () => {
	return [
		{
			title: 'Taskify | Sign-in',
		},
		{
			name: 'description',
			content: 'Your all in one agile board web app | Sign-in',
		},
	];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const { headers, serverSession } = await getSupabaseWithSessionAndHeaders({
		request,
	});
	const { origin } = new URL(request.url);

	if (serverSession) {
		return redirect(ROUTES.DASHBOARD, {
			headers,
		});
	}

	return json(
		{
			success: true,
			url: origin,
		},
		{
			headers,
		}
	);
};

const SignInRoute = () => {
	const { url } = useLoaderData<typeof loader>();

	return (
		<section className={'container'}>
			<AuthHeader authType={AUTH_TYPE.SIGN_IN} />
			<Auth authType={AUTH_TYPE.SIGN_IN} url={url} />
		</section>
	);
};

export default SignInRoute;
