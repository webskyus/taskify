import { CreateColumnDialog } from '~/features/create-column-dialog';
import {useLoaderData, useParams} from '@remix-run/react';
import { loader } from '~/routes/dashboard_.$workspaceId_.$projectId';
import { ProjectColumnsItem } from '~/features/project-columns/ui/components/project-columns-item';
import { EmptyResultMessage } from '~/shared/ui/empty-result-message';
import { ErrorMessage } from '~/shared/ui/error-message';
import { AnimatePresence } from 'framer-motion';
import { useGetProjectColumns } from '~/features/project-columns';
import {getCurrentInfo} from "~/shared/lib/utils";

const ProjectColumns = () => {
	const { projects } = useLoaderData<typeof loader>();
	const { projectId } = useParams();
	const { projectColumns, error } = useGetProjectColumns();
	const {name, description} = getCurrentInfo(projects, projectId);

	return (
		<>
			<header className={'flex items-center justify-between mb-6'}>
				<header>
					<h1 className={'mb-1 text-4xl sm:text-6xl font-bold'}>
						{name}
					</h1>
					<p className={'text-md'}>{description}</p>
				</header>

				<CreateColumnDialog handleSetId={() => 1} />

				{/*TODO ADD FILTERS*/}
			</header>

			{!projectColumns?.length && !error && <EmptyResultMessage />}

			{error && <ErrorMessage />}

			<section
				className={`
                    flex items-start
                    w-full min-h-[240px] 
                    overflow-x-auto
                    transition-all
                `}>
				<AnimatePresence>
					{projectColumns.map(column => {
						return <ProjectColumnsItem />;
					})}
				</AnimatePresence>
			</section>
		</>
	);
};

export { ProjectColumns };
