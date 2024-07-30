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
import { ProjectColumn } from '~/routes/dashboard';
import {
	deleteProjectColumnApi,
	projectColumnsChannelApi,
} from '~/features/project-columns';

export type RealtimePostgresChangesPayloadType =
	RealtimePostgresChangesPayload<{ [p: string]: any }>;

const useGetProjectColumnCrud = () => {
	const { supabase } = useOutletContext<{
		supabase: SupabaseClient;
	}>();

	const handleDeleteProjectColumn = async (id: string) =>
		deleteProjectColumnApi({ supabase, id });

	return {
		handleDeleteProjectColumn,
	};
};

const useGetProjectColumns = () => {
	const { projectId } = useParams();
	const { supabase } = useOutletContext<{
		supabase: SupabaseClient;
	}>();
	const { projectColumns: serverProjectColumns, projectColumnsError: error } =
		useRouteLoaderData(
			'routes/dashboard_.$workspaceId_.$projectId'
		) as SerializeFrom<typeof dashboardProjectLoader>;
	const [projectColumns, setProjectColumns] =
		useState<ProjectColumn[]>(serverProjectColumns);

	useEffect(() => {
		setProjectColumns(serverProjectColumns);
	}, [serverProjectColumns]);

	useEffect(() => {
		projectColumnsChannelApi({
			supabase,
			handleUpdateProjectsList,
			projectId,
		});
	}, [supabase, projectColumns, setProjectColumns]);

	const handleUpdateProjectsList = (
		payload: RealtimePostgresChangesPayloadType
	) => {
		if (!projectColumns) return;

		const newProjectColumn = payload.new as ProjectColumn;
		const oldProjectColumn = payload.old as ProjectColumn;

		const newProjectColumnIndex = projectColumns.find(
			projectColumn => projectColumn.id === newProjectColumn.id
		);
		const oldProjectColumnIndex = projectColumns.findIndex(
			projectColumn => projectColumn.id === oldProjectColumn.id
		);

		!newProjectColumnIndex &&
			getObjectKeysLength(newProjectColumn) &&
			setProjectColumns([...projectColumns, newProjectColumn]);

		oldProjectColumnIndex !== -1 &&
			getObjectKeysLength(oldProjectColumn) &&
			setProjectColumns([
				...projectColumns.slice(0, oldProjectColumnIndex),
				...projectColumns.slice(
					oldProjectColumnIndex + 1,
					projectColumns.length
				),
			]);
	};

	return {
		projectColumns,
		error,
	};
};

export { useGetProjectColumnCrud, useGetProjectColumns };
