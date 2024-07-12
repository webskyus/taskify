import {
	useOutletContext,
	useParams,
	useRouteLoaderData,
} from '@remix-run/react';
import { getObjectKeysLength } from '~/shared/lib/utils';
import { useEffect, useState } from 'react';
import { loader as dashboardProjectsLoader } from '~/routes/dashboard_.$workspaceId';
import { SerializeFrom } from '@remix-run/node';
import {
	RealtimePostgresChangesPayload,
	SupabaseClient,
} from '@supabase/supabase-js';
import { deleteProjectApi, projectChannelApi } from '~/features/projects';
import { Project } from '~/routes/dashboard';

export type RealtimePostgresChangesPayloadType =
	RealtimePostgresChangesPayload<{ [p: string]: any }>;

const useGetProjectCrud = () => {
	const { supabase } = useOutletContext<{
		supabase: SupabaseClient;
	}>();

	const handleDeleteProject = async (id: string) =>
		deleteProjectApi({ supabase, id });

	return {
		handleDeleteProject,
	};
};

const useGetProjects = () => {
	const { supabase } = useOutletContext<{
		supabase: SupabaseClient;
	}>();
	const { projects: serverProjects, error } = useRouteLoaderData(
		'routes/dashboard_.$workspaceId'
	) as SerializeFrom<typeof dashboardProjectsLoader>;
	const [projects, setProjects] = useState<Project[]>(serverProjects);
	const { workspaceId } = useParams();

	useEffect(() => {
		setProjects(serverProjects);
	}, [serverProjects]);

	useEffect(() => {
		projectChannelApi({ supabase, handleUpdateProjectsList, workspaceId });
	}, [supabase, projects, setProjects]);

	const handleUpdateProjectsList = (
		payload: RealtimePostgresChangesPayloadType
	) => {
		if (!projects) return;

		const newProject = payload.new as Project;
		const oldProject = payload.old as Project;

		const newProjectIndex = projects.find(
			project => project.id === newProject.id
		);
		const oldProjectIndex = projects.findIndex(
			project => project.id === oldProject.id
		);

		getObjectKeysLength(newProject) &&
			!newProjectIndex &&
			setProjects([...projects, newProject]);

		getObjectKeysLength(oldProject) &&
			oldProjectIndex !== -1 &&
			setProjects([
				...projects.slice(0, oldProjectIndex),
				...projects.slice(oldProjectIndex + 1, projects.length),
			]);
	};

	return {
		projects,
		error,
	};
};

export { useGetProjectCrud, useGetProjects };
