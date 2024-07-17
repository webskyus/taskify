import {
	ActionFunctionArgs,
	json,
	LoaderFunctionArgs,
	MetaFunction,
	redirect,
} from '@remix-run/node';
import { getSupabaseWithSessionAndHeaders } from '~/app/supabase/supabase.server';
import { ROUTES } from '~/shared/lib/utils/urls';
import { useLoaderData, useParams, } from '@remix-run/react';
import { DashboardHeader } from '~/widgets/dashboard-header';
import { getWorkspacesApi } from '~/features/workspaces';
import {
	Project,
	Workspace,
} from '~/routes/dashboard';
import {getProjectsApi, updateProjectApi} from '~/features/projects';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '~/shared/ui/dropdown-menu';
import { Button } from '~/shared/ui/button';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { CreateColumnDialog } from '~/features/create-column-dialog';
import {validator} from "~/features/create-dialog/ui/create-dialog";
import {validationError} from "remix-validated-form";
import {METHODS} from "~/shared/api";
import {createProjectApi} from "~/features/projects/api";
import {createProjectColumnApi, ProjectColumns, updateProjectColumnApi} from "~/features/project-columns";

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
