import {SupabaseClient} from '@supabase/supabase-js';
import {RealtimePostgresChangesPayloadType} from '~/features/projects/hooks';
import {CreateDialogFormProps} from '~/features/create-dialog/ui/create-dialog';

type CreateProjectColumnApiProps = {
    supabase: SupabaseClient;
    userId: string | undefined;
    workspaceId: string | undefined;
    projectId: string | undefined;
    formData: CreateDialogFormProps;
};

type UpdateProjectColumnApiProps = Omit<
    CreateProjectColumnApiProps,
    'workspaceId' | 'projectId' | 'userId'
>;

type ProjectColumnApiProps = {
    supabase: SupabaseClient;
    id: string;
};

type ProjectColumnsChannelApiProps = {
    supabase: SupabaseClient;
    handleUpdateProjectsList: (
        payload: RealtimePostgresChangesPayloadType
    ) => void;
    projectId: string | undefined;
};

type GetProjectColumnApiProps = {
    supabase: SupabaseClient;
    projectId: string | undefined;
};

const createProjectColumnApi = async ({
                                          supabase,
                                          userId,
                                          workspaceId,
                                          projectId,
                                          formData,
                                      }: CreateProjectColumnApiProps) => {
    try {
        const {name} = formData;
        await supabase
            .from('project_columns')
            .insert([
                {
                    name,
                    owner_id: userId,
                    workspace_id: workspaceId,
                    project_id: projectId,
                },
            ]);
    } catch (e) {
        console.log('dd.form.error');
    }
};

const updateProjectColumnApi = async ({
                                          supabase,
                                          formData,
                                      }: UpdateProjectColumnApiProps) => {
    try {
        const {id, name, description, icon, color} = formData;

        await supabase
            .from('project_columns')
            .update({
                name,
            })
            .eq('id', id);
    } catch (e) {
        console.log('dd.form.error');
    }
};

const deleteProjectColumnApi = async ({
                                          supabase,
                                          id,
                                      }: ProjectColumnApiProps) => {
    try {
        await supabase.from('project_columns').delete().eq('id', id);
    } catch (e) {
        console.log('dd.delete.Project.error', e);
    }
};

const projectColumnsChannelApi = async ({
                                            supabase,
                                            handleUpdateProjectsList,
                                            projectId,
                                        }: ProjectColumnsChannelApiProps) => {
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
                table: 'project_columns',
                filter: `project_id=eq.${projectId}`,
            },
            payload => handleUpdateProjectsList(payload)
        )
        .subscribe();

    return () => supabase.removeChannel(channel);
};

const getProjectColumnsApi = async ({
                                        supabase,
                                        projectId,
                                    }: GetProjectColumnApiProps) => {
    const {data, error} = await supabase
        .from('project_columns')
        .select()
        .eq('project_id', projectId);

    return {
        data,
        error,
    };
};

export {
    createProjectColumnApi,
    updateProjectColumnApi,
    deleteProjectColumnApi,
    projectColumnsChannelApi,
    getProjectColumnsApi,
};
