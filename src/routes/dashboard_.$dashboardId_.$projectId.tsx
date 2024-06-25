import {
	json,
	LoaderFunctionArgs,
	MetaFunction,
	redirect,
} from '@remix-run/node';
import { getSupabaseWithSessionAndHeaders } from '~/app/supabase/supabase.server';
import { ROUTES } from '~/shared/lib/utils/urls';
import { useLoaderData, useParams } from '@remix-run/react';
import { DashboardHeader } from '~/widgets/dashboard-header';

export const meta: MetaFunction = () => {
	return [
		{
			title: 'Taskify | Projects',
		},
		{
			name: 'description',
			content: 'Your all in one productivity app | Projects',
		},
	];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const { headers, serverSession, supabase } =
		await getSupabaseWithSessionAndHeaders({
			request,
		});
	const { data } = await supabase
		.from('profiles')
		.select()
		.eq('id', serverSession?.user?.id)
		.single();

	if (!serverSession) {
		return redirect(ROUTES.SIGN_IN, {
			headers,
		});
	}

	return json(
		{
			serverSession,
			profile: data,
		},
		{
			headers,
		}
	);
};

// WORKSPACES + | CHOOSE ONE
// PROJECTS + | CHOOSE ONE
// SUPABASE | add property from notebook
// SUPABASE | add projects
// SUPABASE | handle for new user create workspace

const Dashboard = () => {
	const { profile } = useLoaderData<typeof loader>();
	const { projectId } = useParams();

	return (
		<section className={'container'}>
			<DashboardHeader data={profile} />

			<section>
				<h1 className={'mb-6 text-4xl sm:text-6xl font-bold'}>
					🌸 Project Name | ID {projectId}
				</h1>
			</section>
		</section>
	);
};

export default Dashboard;
