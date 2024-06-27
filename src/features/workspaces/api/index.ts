import { SupabaseClient } from '@supabase/supabase-js';
import { RealtimePostgresChangesPayloadType } from '~/features/workspaces/hooks';

type WorkspaceApiProps = {
	supabase: SupabaseClient;
	id: string;
};

type WorkspaceChannelApiProps = {
	supabase: SupabaseClient;
	handleUpdateWorkspacesList: (
		payload: RealtimePostgresChangesPayloadType
	) => void;
};

type GetPersonalWorkspacesApiProps = {
	supabase: SupabaseClient;
	userId: string | undefined;
};

const updateWorkspaceApi = async ({
	supabase,
	id,
}: WorkspaceApiProps) => {};

const deleteWorkspaceApi = async ({
	supabase,
	id
}: WorkspaceApiProps) => {
	try {
		await supabase.from('workspaces').delete().eq('id', id);
	} catch (e) {
		console.log('dd.delete.workspace.error', e);
	}
};

const workspaceChannelApi = async ({
	supabase,
	handleUpdateWorkspacesList,
}: WorkspaceChannelApiProps) => {
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
				table: 'workspaces',
				filter: `owner_id=eq.${user?.id}`,
			},
			payload => handleUpdateWorkspacesList(payload)
		)
		.subscribe();

	return () => supabase.removeChannel(channel);
};

const getPersonalWorkspacesApi = async ({
	supabase,
	userId,
}: GetPersonalWorkspacesApiProps) => {
	const { data, error } = await supabase
		.from('workspaces')
		.select()
		.eq('owner_id', userId);

	return {
		data,
		error,
	};
};

export {
	updateWorkspaceApi,
	deleteWorkspaceApi,
	workspaceChannelApi,
	getPersonalWorkspacesApi,
};
