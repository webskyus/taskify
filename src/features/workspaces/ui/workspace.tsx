import { CreateDialog } from '~/features/create-dialog';
import {CREATED_PAGE_TYPE, WORKSPACE_TEXT} from '~/shared/lib/utils/static';
import { EmptyResultMessage } from '~/shared/ui/empty-result-message';
import { ErrorMessage } from '~/shared/ui/error-message';
import { WorkspaceItem } from '~/features/workspaces/ui/components/workspace-item';
import { useGetWorkspaces } from '~/features/workspaces';
import { AnimatePresence, motion } from 'framer-motion';
import { gradientColors } from '~/shared/lib/utils/constants';

const Workspaces = () => {
	const { workspaces, error } = useGetWorkspaces();

	return (
		<>
			<header className={'flex items-center justify-between mb-6'}>
				<header>
					<h1 className={'mb-1 text-4xl sm:text-6xl font-bold'}>
						{WORKSPACE_TEXT.title}
					</h1>
					<p className={'text-md'}>
						{WORKSPACE_TEXT.description}
					</p>
				</header>

				<CreateDialog type={CREATED_PAGE_TYPE.WORKSPACE} />
			</header>

			{!workspaces?.length && !error && <EmptyResultMessage />}

			{error && <ErrorMessage />}

			<section
				className={`
                    grid grid-rows-4 grid-cols-1 
                    gap-1 mb-4
                    sm:grid-cols-2 
                    lg:grid-cols-4  
                    transition-all
                `}>
				<AnimatePresence>
					{workspaces?.map((workspace, i) => {
						const { id, color } = workspace;
						return (
							<motion.article
								className={`p-4 rounded ${gradientColors[color]}`}
								layout
								key={id}
								initial={{ opacity: 0, y: -20 * i }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 20 * i }}
								transition={{ duration: 0.5 }}>
								<WorkspaceItem workspace={workspace} />
							</motion.article>
						);
					})}
				</AnimatePresence>
			</section>
		</>
	);
};

export { Workspaces };
