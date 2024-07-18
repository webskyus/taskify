import {
	ActionFunctionArgs,
	json,
	LoaderFunctionArgs,
	MetaFunction,
	redirect,
} from '@remix-run/node';
import { getSupabaseWithSessionAndHeaders } from '~/app/supabase/supabase.server';
import { ROUTES } from '~/shared/lib/utils/urls';
import { useLoaderData, } from '@remix-run/react';
import { DashboardHeader } from '~/widgets/dashboard-header';
import { getWorkspacesApi } from '~/features/workspaces';
import { Project, ProjectColumn, Workspace } from '~/routes/dashboard';
import { getProjectsApi, } from '~/features/projects';
import { validator } from '~/features/create-dialog/ui/create-dialog';
import { validationError } from 'remix-validated-form';
import { METHODS } from '~/shared/api';
import {
	createProjectColumnApi,
	getProjectColumnsApi,
	ProjectColumns,
	updateProjectColumnApi,
} from '~/features/project-columns';

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

export const action = async ({ request, params }: ActionFunctionArgs) => {
	const { supabase } = await getSupabaseWithSessionAndHeaders({
		request,
	});
	const result = await validator.validate(await request.formData());
	const { data: formData, error } = result;
	const {
		data: { user },
	} = await supabase.auth.getUser();
	const userId = user?.id;
	const { projectId } = params;

	if (error) return validationError(result.error);

	if (request?.method === METHODS.POST) {
		await createProjectColumnApi({ supabase, userId, projectId, formData });
	}

	if (request?.method === METHODS.PUT) {
		await updateProjectColumnApi({ supabase, formData });
	}

	return json({
		ok: true,
	});
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
	const { headers, serverSession, supabase } =
		await getSupabaseWithSessionAndHeaders({
			request,
		});
	const { workspaceId, projectId } = params;
	const userId = serverSession?.user?.id;

	const { data: workspaces, error: workspacesError } = await getWorkspacesApi({
		supabase,
		userId,
	});

	const { data: projects, error: projectsError } = await getProjectsApi({
		supabase,
		workspaceId,
	});

	const { data: projectColumns, error: projectColumnsError } =
		await getProjectColumnsApi({
			supabase,
			projectId,
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
			projectColumns: projectColumns as ProjectColumn[],

			workspacesError,
			projectsError,
			projectColumnsError,
		},
		{
			headers,
		}
	);
};

const ProjectRoute = () => {
	const { workspaces, projects } = useLoaderData<typeof loader>();

	return (
		<section className={'container'}>
			<DashboardHeader workspaces={workspaces} projects={projects} />
			<ProjectColumns />
		</section>
	);
};

export default ProjectRoute;
