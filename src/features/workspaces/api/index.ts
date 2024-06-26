import {SupabaseClient} from "@supabase/supabase-js";
import {RealtimePostgresChangesPayloadType} from "~/features/workspaces/hooks";

type UpdateWorkspaceApiProps = DeleteWorkspaceApiProps;

type DeleteWorkspaceApiProps = {
    supabase: SupabaseClient,
    id: string
}

type WorkspaceChannelApiProps = {
    supabase: SupabaseClient,
    handleUpdateWorkspacesList: (payload: RealtimePostgresChangesPayloadType) => void;
}

const updateWorkspaceApi = async ({supabase, id}: UpdateWorkspaceApiProps) => {}

const deleteWorkspaceApi = async ({supabase, id}: DeleteWorkspaceApiProps) => {
    try {
        await supabase
            .from('workspaces')
            .delete()
            .eq('id', id);
    } catch (e) {
        console.log('dd.delete.workspace.error', e);
    }
};

const workspaceChannelApi = async ({supabase, handleUpdateWorkspacesList}: WorkspaceChannelApiProps) => {
    const {
        data: {user},
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
}

export {
    updateWorkspaceApi,
    deleteWorkspaceApi,
    workspaceChannelApi
}
