import { SupabaseClient } from '@supabase/supabase-js';
import { RealtimePostgresChangesPayloadType } from '~/features/projects/hooks';
import { CreateDialogFormProps } from '~/features/create-dialog/ui/create-dialog';

type CreateProjectApiProps = {
	supabase: SupabaseClient;
	userId: string | undefined;
	workspaceId: string | undefined;
	formData: CreateDialogFormProps;
};

type UpdateProjectApiProps = Omit<
	CreateProjectApiProps,
	'workspaceId' | 'userId'
>;

type ProjectApiProps = {
	supabase: SupabaseClient;
	id: string;
};

type ProjectChannelApiProps = {
	supabase: SupabaseClient;
	handleUpdateProjectsList: (
		payload: RealtimePostgresChangesPayloadType
	) => void;
	workspaceId: string | undefined;
};

type GetProjectsApiProps = {
	supabase: SupabaseClient;
	workspaceId: string | undefined;
};

const createProjectApi = async ({
	supabase,
	userId,
	workspaceId,
	formData,
}: CreateProjectApiProps) => {
	try {
		const { name, description, icon, color } = formData;
		console.log('dd.create.project', formData);
		await supabase.from('projects').insert([
			{
				name,
				description,
				icon,
				color: +color,
				owner_id: userId,
				workspace_id: workspaceId,
			},
		]);
	} catch (e) {
		console.log('dd.form.error');
	}
};

const updateProjectApi = async ({
	supabase,
	formData,
}: UpdateProjectApiProps) => {
	try {
		const { id, name, description, icon, color } = formData;

		await supabase
			.from('projects')
			.update({
				name,
				description,
				icon,
				color: +color,
			})
			.eq('id', id);
	} catch (e) {
		console.log('dd.form.error');
	}
};

const deleteProjectApi = async ({ supabase, id }: ProjectApiProps) => {
	try {
		await supabase.from('projects').delete().eq('id', id);
	} catch (e) {
		console.log('dd.delete.Project.error', e);
	}
};

const projectChannelApi = async ({
	supabase,
	handleUpdateProjectsList,
	workspaceId,
}: ProjectChannelApiProps) => {
	const {
		data: { user },
	} = await supabase.auth.getUser();
	const channel = supabase
		.channel('table-db-changes')
		.on(
			'postgres_changes',
			{
				event: '*',
				schema: 'public',
				table: 'projects',
				filter: `workspace_id=eq.${workspaceId}`,
			},
			payload => handleUpdateProjectsList(payload)
		)
		.subscribe();

	return () => supabase.removeChannel(channel);
};

const getProjectsApi = async ({
	supabase,
	workspaceId,
}: GetProjectsApiProps) => {
	const { data, error } = await supabase
		.from('projects')
		.select()
		.eq('workspace_id', workspaceId);

	return {
		data,
		error,
	};
};

export {
	createProjectApi,
	updateProjectApi,
	deleteProjectApi,
	projectChannelApi,
	getProjectsApi,
};
