import {
	ActionFunctionArgs,
	json,
	LoaderFunctionArgs,
	MetaFunction,
	redirect,
} from '@remix-run/node';
import { getSupabaseWithSessionAndHeaders } from '~/app/supabase/supabase.server';
import { ROUTES } from '~/shared/lib/utils/urls';
import {DashboardHeader} from '~/widgets/dashboard-header';
import {getProjectsApi, Projects, updateProjectApi} from "~/features/projects";
import {Project} from "~/routes/dashboard";
import {validator} from "~/features/create-dialog/ui/create-dialog";
import {validationError} from "remix-validated-form";
import {METHODS} from "~/shared/api";
import {createWorkspaceApi, updateWorkspaceApi} from "~/features/workspaces/api";
import {createProjectApi} from "~/features/projects/api";

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

export const action = async ({ request }: ActionFunctionArgs) => {
	const { supabase } = await getSupabaseWithSessionAndHeaders({
		request,
	});
	const result = await validator.validate(await request.formData());
	const { data: formData, error } = result;
	const {
		data: { user },
	} = await supabase.auth.getUser();
	const userId = user?.id;

	if (error) return validationError(result.error);

	if (request?.method === METHODS.POST) {
		await createProjectApi({ supabase, userId, formData });
	}

	if (request?.method === METHODS.PUT) {
		await updateProjectApi({ supabase, formData });
	}

	return json({
		ok: true,
	});
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
	return (
		<section className={'container'}>
			<DashboardHeader />
			<Projects/>
		</section>
	);
};

export default Dashboard;
