import { SupabaseClient } from '@supabase/supabase-js';
import { CreateTaskDialogFormProps } from '~/features/create-task-dialog/ui/create-task-dialog';
import { ProjectTask } from '~/routes/dashboard';
import { RealtimePostgresChangesPayloadType } from '~/features/projects/hooks';

type ProjectTaskApiProps = {
	id?: string;
	supabase: SupabaseClient;
	userId: string | undefined;
	projectId: string | undefined;
	formData: CreateTaskDialogFormProps;
	projectTasks?: ProjectTask[];
};

type CreateProjectColumnApiProps = Omit<
	ProjectTaskApiProps,
	'id' | 'projectTasks'
>;

type GetProjectTasksApiProps = Omit<
	ProjectTaskApiProps,
	'formData' | 'userId' | 'id' | 'projectTasks'
>;

type DeleteProjectTaskApiProps = Omit<
	ProjectTaskApiProps,
	'formData' | 'userId' | 'projectId' | 'projectTasks'
>;

type UpdateProjectTaskApiProps = Omit<
	ProjectTaskApiProps,
	'userId' | 'projectId'
>;

type ProjectTasksChannelApiProps = {
	supabase: SupabaseClient;
	handleUpdateProjectTasksList: (
		payload: RealtimePostgresChangesPayloadType
	) => void;
	projectId: string | undefined;
};

const createProjectTaskApi = async ({
	supabase,
	userId,
	projectId,
	formData,
}: CreateProjectColumnApiProps) => {
	try {
		const { name, content, projectColumnId } = formData;

		await supabase.from('project_tasks').insert([
			{
				name,
				content,
				order: 0,
				owner_id: userId,
				project_id: projectId,
				project_column_id: projectColumnId,
			},
		]);
	} catch (e) {
		console.log('dd.form.error', e);
	}
};

const getProjectTasksApi = async ({
	supabase,
	projectId,
}: GetProjectTasksApiProps) => {
	const { data, error } = await supabase
		.from('project_tasks')
		.select()
		.order('order', {
			ascending: true,
		})
		.eq('project_id', projectId);

	return {
		data,
		error,
	};
};

const updateProjectTaskApi = async ({
	supabase,
	formData,
	projectTasks,
}: UpdateProjectTaskApiProps) => {
	try {
		if (formData) {
			const { name, id, content } = formData;

			await supabase
				.from('project_tasks')
				.update({
					name,
					content,
				})
				.eq('id', id);
		}

		if (projectTasks) {
			const reorderProjectTasks = projectTasks.map((projectTask, index) => ({
				...projectTask,
				order: index,
			}));

			await supabase.from('project_tasks').upsert(reorderProjectTasks);
		}
	} catch (e) {
		console.log('dd.form.error');
	}
};

const deleteProjectTaskApi = async ({
	supabase,
	id,
}: DeleteProjectTaskApiProps) => {
	try {
		await supabase.from('project_tasks').delete().eq('id', id);
	} catch (e) {
		console.log('dd.delete.Project.error', e);
	}
};

const projectTasksChannelApi = async ({
	supabase,
	handleUpdateProjectTasksList,
	projectId,
}: ProjectTasksChannelApiProps) => {
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
				table: 'project_tasks',
				filter: `project_id=eq.${projectId}`,
			},
			payload => handleUpdateProjectTasksList(payload)
		)
		.subscribe();

	return () => supabase.removeChannel(channel);
};

export {
	getProjectTasksApi,
	createProjectTaskApi,
	deleteProjectTaskApi,
	updateProjectTaskApi,
	projectTasksChannelApi,
};
