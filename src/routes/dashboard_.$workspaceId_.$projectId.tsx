import {
	json,
	LoaderFunctionArgs,
	MetaFunction,
	redirect, SerializeFrom,
} from '@remix-run/node';
import { getSupabaseWithSessionAndHeaders } from '~/app/supabase/supabase.server';
import { ROUTES } from '~/shared/lib/utils/urls';
import {useLoaderData, useParams, useRouteLoaderData} from '@remix-run/react';
import { DashboardHeader } from '~/widgets/dashboard-header';
import {getWorkspacesApi} from "~/features/workspaces";
import {loader as dashboardLoader, Project, Workspace} from "~/routes/dashboard";
import {getProjectsApi} from "~/features/projects";

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

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
	const { headers, serverSession, supabase } =
		await getSupabaseWithSessionAndHeaders({
			request,
		});
	const { workspaceId } = params;
	const userId = serverSession?.user?.id;

	const { data: workspaces } = await getWorkspacesApi({
		supabase,
		userId,
	});

	const { data: projects } = await getProjectsApi({
		supabase,
		workspaceId,
	});

	if (!serverSession) {
		return redirect(ROUTES.SIGN_IN, {
			headers,
		});
	}

	return json(
		{
			serverSession,
			workspaces: workspaces as Workspace[],
			projects: projects as Project[],
		},
		{
			headers,
		}
	);
};

const ProjectPage = () => {
	const {workspaces, projects} = useLoaderData<typeof loader>();
	const { projectId } = useParams();

	return (
		<section className={'container'}>
			<DashboardHeader workspaces={workspaces} projects={projects} />

			<section>
				<h1 className={'mb-6 text-4xl sm:text-6xl font-bold'}>
					🌸 Project Name | ID {projectId}
				</h1>
			</section>
		</section>
	);
};

export default ProjectPage;
