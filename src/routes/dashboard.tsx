import {
	ActionFunctionArgs,
	json,
	LoaderFunctionArgs,
	MetaFunction,
	redirect,
} from '@remix-run/node';
import { getSupabaseWithSessionAndHeaders } from '~/app/supabase/supabase.server';
import { ROUTES } from '~/shared/lib/utils/urls';
import { DashboardHeader } from '~/widgets/dashboard-header';
import { validator } from '~/features/create-dialog/ui/create-dialog';
import { validationError } from 'remix-validated-form';
import { Database } from '~/app/supabase/supabase.database';
import {
	getWorkspacesApi,
	updateWorkspaceApi,
	Workspaces,
} from '~/features/workspaces';
import { METHODS } from '~/shared/api';
import { createWorkspaceApi } from '~/features/workspaces/api';

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Workspace = Database['public']['Tables']['workspaces']['Row'];
export type Project = Database['public']['Tables']['projects']['Row'];

export const meta: MetaFunction = () => {
	return [
		{
			title: 'Taskify | Dashboard',
		},
		{
			name: 'description',
			content: 'Your all in one productivity app | Dashboard',
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
		await createWorkspaceApi({ supabase, userId, formData });
	}

	if (request?.method === METHODS.PUT) {
		await updateWorkspaceApi({ supabase, formData });
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
	const { data: workspaces, error } = await getWorkspacesApi({
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
			workspaces: workspaces as Workspace[],
			error,
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
			<Workspaces />
		</section>
	);
};

export default Dashboard;
