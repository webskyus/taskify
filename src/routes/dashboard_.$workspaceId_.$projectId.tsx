import {
	ActionFunctionArgs,
	json,
	LoaderFunctionArgs,
	MetaFunction,
	redirect,
} from '@remix-run/node';
import { getSupabaseWithSessionAndHeaders } from '~/app/supabase/supabase.server';
import { ROUTES } from '~/shared/lib/utils/urls';
import { useLoaderData } from '@remix-run/react';
import { DashboardHeader } from '~/widgets/dashboard-header';
import { getWorkspacesApi } from '~/features/workspaces';
import {
	Project,
	ProjectColumn,
	ProjectTask,
	Workspace,
} from '~/routes/dashboard';
import { getProjectsApi } from '~/features/projects';
import { validationError } from 'remix-validated-form';
import { METHODS } from '~/shared/api';
import {
	createProjectColumnApi,
	getProjectColumnsApi,
	ProjectColumns,
	updateProjectColumnApi,
} from '~/features/project-columns';
import { createColumnDialogValidator } from '~/features/create-column-dialog/ui/create-column-dialog';
import { FORM_IDS } from '~/shared/lib/utils/constants';
import {
	createProjectTaskApi,
	getProjectTasksApi,
} from '~/features/project-tasks';
import { createTaskDialogValidator } from '~/features/create-task-dialog/ui/create-task-dialog';
import { updateProjectTaskApi } from '~/features/project-tasks/api';

export const meta: MetaFunction = () => {
	return [
		{
			title: 'Taskify | Project',
		},
		{
			name: 'description',
			content: 'Your all in one productivity app | Project',
		},
	];
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
	const { supabase } = await getSupabaseWithSessionAndHeaders({
		request,
	});
	const {
		data: { user },
	} = await supabase.auth.getUser();
	const userId = user?.id;
	const { projectId } = params;
	const formData = await request.formData();

	// CRUD OPERATIONS FOR PROJECT COLUMN
	try {
		const resultProjectColumn =
			await createColumnDialogValidator.validate(formData);

		const {
			data: projectColumnFormData,
			error: projectColumnError,
			submittedData: { __rvfInternalFormId: projectColumnFormName },
		} = resultProjectColumn;

		if (projectColumnError) return validationError(projectColumnError);

		if (
			request?.method === METHODS.POST &&
			projectColumnFormName === FORM_IDS.CREATE_COLUMN_DIALOG_FORM
		) {
			await createProjectColumnApi({
				supabase,
				userId,
				projectId,
				formData: projectColumnFormData,
			});
		}

		if (
			request?.method === METHODS.PUT &&
			projectColumnFormName === FORM_IDS.CREATE_COLUMN_DIALOG_FORM
		) {
			await updateProjectColumnApi({
				supabase,
				formData: projectColumnFormData,
			});
		}
	} catch (e) {
		console.log(`CRUD.${FORM_IDS.CREATE_COLUMN_DIALOG_FORM}.error`, e);
	}

	// CRUD OPERATIONS FOR PROJECT TASK
	try {
		const resultProjectTask =
			await createTaskDialogValidator.validate(formData);

		const {
			data: projectTaskFormData,
			error: projectTaskError,
			submittedData: { __rvfInternalFormId: projectTaskFormName },
		} = resultProjectTask;

		if (projectTaskError) return validationError(projectTaskError);

		if (
			request?.method === METHODS.POST &&
			projectTaskFormName === FORM_IDS.CREATE_TASK_DIALOG_FORM
		) {
			await createProjectTaskApi({
				supabase,
				userId,
				projectId,
				formData: projectTaskFormData,
			});
		}

		if (
			request?.method === METHODS.PUT &&
			projectTaskFormName === FORM_IDS.CREATE_TASK_DIALOG_FORM
		) {
			await updateProjectTaskApi({
				supabase,
				formData: projectTaskFormData,
			});
		}
	} catch (e) {
		console.log(`CRUD.${FORM_IDS.CREATE_TASK_DIALOG_FORM}.error`, e);
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

	const { data: projectTasks, error: projectTasksError } =
		await getProjectTasksApi({
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
			projectTasks: projectTasks as ProjectTask[],

			workspacesError,
			projectsError,
			projectColumnsError,
			projectTasksError,
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
