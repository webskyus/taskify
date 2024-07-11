import {
	json,
	LoaderFunctionArgs,
	MetaFunction,
	redirect,
} from '@remix-run/node';
import { getSupabaseWithSessionAndHeaders } from '~/app/supabase/supabase.server';
import { ROUTES } from '~/shared/lib/utils/urls';
import { Link, useLoaderData, useParams } from '@remix-run/react';
import {DashboardHeader, getUserProfileApi} from '~/widgets/dashboard-header';
import { gradientColors } from '~/shared/lib/utils/constants';
import { getRandomInt } from '~/shared/lib/utils';
import {getWorkspacesApi} from "~/features/workspaces";
import {getProjectsApi} from "~/features/projects";
import {Project, Workspace} from "~/routes/dashboard";

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
	const userId = serverSession?.user?.id;
	const { data: projects, error } = await getProjectsApi({
		supabase,
		userId,
	});

	if (!serverSession) {
		return redirect(ROUTES.SIGN_IN, {
			headers,
		});
	}

	return json(
		{
			serverSession,
			projects: projects as Project[],
			error
		},
		{
			headers,
		}
	);
};

const Dashboard = () => {
	const { dashboardId } = useParams();

	return (
		<section className={'container'}>
			<DashboardHeader />

			<section>
				<h1 className={'mb-6 text-4xl sm:text-6xl font-bold'}>Projects</h1>

				<section
					className={
						'grid grid-rows-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 mb-4'
					}>

				</section>
			</section>
		</section>
	);
};

export default Dashboard;
