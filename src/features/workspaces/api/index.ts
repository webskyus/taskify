import {SupabaseClient} from '@supabase/supabase-js';
import {RealtimePostgresChangesPayloadType} from '~/features/workspaces/hooks';

type CreateWorkspaceApiProps = {
    supabase: SupabaseClient;
    userId: string | undefined;
    formData: {
        id?: string,
        name: string,
        description: string,
        icon: string,
        color: string,
    }
}

type UpdateWorkspaceApiProps = Omit<CreateWorkspaceApiProps, "userId">;

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

type GetWorkspacesApiProps = {
    supabase: SupabaseClient;
    userId: string | undefined;
};

const createWorkspaceApi = async ({
                                      supabase,
                                      userId,
                                      formData
                                  }: CreateWorkspaceApiProps) => {
    try {
        const {name, description, icon, color} = formData;

        await supabase
            .from('workspaces')
            .insert([
                {
                    name,
                    description,
                    icon,
                    color: +color,
                    owner_id: userId,
                },
            ]);
    } catch (e) {
        console.log('dd.form.error');
    }
}

const updateWorkspaceApi = async ({
                                      supabase,
                                      formData
                                  }: UpdateWorkspaceApiProps) => {
    try {
        const {
            id,
            name,
            description,
            icon,
            color
        } = formData;

        await supabase
            .from('workspaces')
            .update(
                {
                    name,
                    description,
                    icon,
                    color: +color
                })
            .eq('id', id);
    } catch (e) {
        console.log('dd.form.error');
    }
};

const deleteWorkspaceApi = async ({supabase, id}: WorkspaceApiProps) => {
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
};

const getWorkspacesApi = async ({
                                    supabase,
                                    userId,
                                }: GetWorkspacesApiProps) => {
    const {data, error} = await supabase
        .from('workspaces')
        .select()
        .eq('owner_id', userId);

    return {
        data,
        error,
    };
};

const getWorkspaceApi = async ({
                                   supabase,
                                   id,
                               }: WorkspaceApiProps) => {
    const {data, error} = await supabase
        .from('workspaces')
        .select()
        .eq('id', id)
        .single();

    return {
        data,
        error,
    };
};

export {
    createWorkspaceApi,
    updateWorkspaceApi,
    deleteWorkspaceApi,
    workspaceChannelApi,
    getWorkspacesApi,
};
