import {
	ActionFunctionArgs,
	json,
	LoaderFunctionArgs,
	MetaFunction,
	redirect,
} from '@remix-run/node';
import { getSupabaseWithSessionAndHeaders } from '~/app/supabase/supabase.server';
import { ROUTES } from '~/shared/lib/utils/urls';
import { DashboardHeader, getUserProfileApi } from '~/widgets/dashboard-header';
import { validator } from '~/features/create-dialog/ui/create-dialog';
import { validationError } from 'remix-validated-form';
import { Database } from '~/app/supabase/supabase.database';
import { getPersonalWorkspacesApi, Workspaces } from '~/features/workspaces';

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Workspace = Database['public']['Tables']['workspaces']['Row'];

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

	if (error) return validationError(result.error);

	try {
		const { name, description, icon, color } = formData;
		const {
			data: { user },
		} = await supabase.auth.getUser();

		await supabase.from('workspaces').insert([
			{
				name,
				description,
				icon,
				color: +color,
				owner_id: user?.id,
			},
		]);
	} catch (e) {
		console.log('dd.form.error');
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

	const { data: profile } = await getUserProfileApi({ supabase, userId });

	const { data: workspaces, error } = await getPersonalWorkspacesApi({
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
			profile: profile as Profile,
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
