import {
	useOutletContext,
	useParams,
	useRouteLoaderData,
} from '@remix-run/react';
import { getObjectKeysLength } from '~/shared/lib/utils';
import { useEffect, useState } from 'react';
import { loader as dashboardProjectLoader } from '~/routes/dashboard_.$workspaceId_.$projectId';
import { SerializeFrom } from '@remix-run/node';
import {
	RealtimePostgresChangesPayload,
	SupabaseClient,
} from '@supabase/supabase-js';
import { ProjectTask } from '~/routes/dashboard';
import { deleteProjectTaskApi } from '~/features/project-tasks/api';

export type RealtimePostgresChangesPayloadType =
	RealtimePostgresChangesPayload<{ [p: string]: any }>;

const useGetProjectTaskCrud = () => {
	const { supabase } = useOutletContext<{
		supabase: SupabaseClient;
	}>();

	const handleDeleteProjectTask = async (id: string) => {
		await deleteProjectTaskApi({ supabase, id });
	};

	return {
		handleDeleteProjectTask,
	};
};

const useGetProjectTasks = () => {
	const { projectId } = useParams();
	const { supabase } = useOutletContext<{
		supabase: SupabaseClient;
	}>();
	const { projectTasks: serverProjectTasks, projectTasksError: error } =
		useRouteLoaderData(
			'routes/dashboard_.$workspaceId_.$projectId'
		) as SerializeFrom<typeof dashboardProjectLoader>;
	const [projectTasks, setProjectTasks] =
		useState<ProjectTask[]>(serverProjectTasks);

	useEffect(() => {
		setProjectTasks(serverProjectTasks);
	}, [serverProjectTasks]);

	useEffect(() => {
		// projectTasksChannelApi({
		// 	supabase,
		// 	handleUpdateProjectsList,
		// 	projectId,
		// });
	}, [supabase, projectTasks, setProjectTasks]);

	const handleUpdateProjectsList = (
		payload: RealtimePostgresChangesPayloadType
	) => {
		const { eventType } = payload;
		if (!projectTasks) return;

		const newProjectTask = payload.new as ProjectTask;
		const oldProjectTask = payload.old as ProjectTask;

		const newProjectColumnIndex = projectTasks.find(
			projectTask => projectTask.id === newProjectTask.id
		);
		const oldProjectColumnIndex = projectTasks.findIndex(
			projectTask => projectTask.id === oldProjectTask.id
		);

		!newProjectColumnIndex &&
			getObjectKeysLength(newProjectTask) &&
			setProjectTasks([...projectTasks, newProjectTask]);

		if (eventType === 'DELETE') {
			oldProjectColumnIndex !== -1 &&
				getObjectKeysLength(oldProjectTask) &&
				setProjectTasks([
					...projectTasks.slice(0, oldProjectColumnIndex),
					...projectTasks.slice(
						oldProjectColumnIndex + 1,
						setProjectTasks.length
					),
				]);
		}

		if (eventType === 'UPDATE') {
			const oldProjectTasks = projectTasks.filter(
				projectTask => projectTask.id !== payload?.new?.id
			);
			const result = (
				[...oldProjectTasks, payload?.new as ProjectTask] as ProjectTask[]
			).sort((a, b) => a.order - b.order);

			setProjectTasks(result);
		}
	};

	return {
		projectTasks,
		error,
	};
};

export { useGetProjectTaskCrud, useGetProjectTasks };
