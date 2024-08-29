import { CreateDialog, useSetCreateDialogForm } from '~/features/create-dialog';
import { CREATED_PAGE_TYPE, WORKSPACE_TEXT } from '~/shared/lib/utils/static';
import { EmptyResultMessage } from '~/shared/ui/empty-result-message';
import { ErrorMessage } from '~/shared/ui/error-message';
import { WorkspaceItem } from '~/features/workspaces/ui/components/workspace-item';
import { useGetWorkspaces } from '~/features/workspaces';
import { AnimatePresence, motion } from 'framer-motion';
import { gradientColors } from '~/shared/lib/utils/constants';
import { useState } from 'react';
import { ROUTES } from '~/shared/lib/utils/urls';

const Workspaces = () => {
	const [id, setId] = useState<string>();

	const { workspaces, error } = useGetWorkspaces();
	const { defaultValue } = useSetCreateDialogForm(id, workspaces);

	return (
		<>
			<header className={'flex items-center justify-between mb-6'}>
				<header className={'pr-10 sm:pr-2'}>
					<h1 className={'mb-1 text-4xl sm:text-6xl font-bold'}>
						{WORKSPACE_TEXT.title}
					</h1>
					<p className={'text-md'}>{WORKSPACE_TEXT.description}</p>
				</header>

				<CreateDialog
					type={CREATED_PAGE_TYPE.WORKSPACE}
					id={id}
					handleSetId={setId}
					defaultValue={defaultValue}
					formAction={ROUTES.DASHBOARD}
				/>

				{/*TODO ADD FILTERS*/}
			</header>

			<EmptyResultMessage state={!workspaces?.length && !error} />
			<ErrorMessage state={error} />

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
								layout
								key={id}
								initial={{ opacity: 0, y: -20 * i }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 20 * i }}
								transition={{ duration: 0.5 }}
								className={`p-4 rounded ${gradientColors[color]}`}>
								<WorkspaceItem workspace={workspace} handleSetId={setId} />
							</motion.article>
						);
					})}
				</AnimatePresence>
			</section>
		</>
	);
};

export { Workspaces };
