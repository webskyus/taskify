import { CreateDialog } from '~/features/create-dialog';
import {CREATED_PAGE_TYPE, WORKSPACE_TEXT} from '~/shared/lib/utils/static';
import { EmptyResultMessage } from '~/shared/ui/empty-result-message';
import { ErrorMessage } from '~/shared/ui/error-message';
import { WorkspaceItem } from '~/features/workspaces/ui/components/workspace-item';
import {useGetWorkspaces} from '~/features/workspaces';
import { AnimatePresence, motion } from 'framer-motion';
import { gradientColors } from '~/shared/lib/utils/constants';
import {useEffect, useState} from "react";
import {CreateDialogFormProps} from "~/features/create-dialog/ui/create-dialog";
import {useOutletContext} from "@remix-run/react";
import {SupabaseClient} from "@supabase/supabase-js";
import {getWorkspaceApi} from "~/features/workspaces/api";

const Workspaces = () => {
	const [defaultValues, setDefaultValues] = useState<CreateDialogFormProps>();
	const [id, setId] = useState<string>();

	const { supabase } = useOutletContext<{
		supabase: SupabaseClient;
	}>();
	const { workspaces, error } = useGetWorkspaces();

	useEffect(() => {
		if (!id) return;
		handleSetFormDefaultValues(id);

		return () => setDefaultValues(undefined);
	}, [id]);

	const handleSetFormDefaultValues = async (id: string) => {
			const {data} = await getWorkspaceApi({supabase, id});
			setDefaultValues(data);
	}

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

				<CreateDialog type={CREATED_PAGE_TYPE.WORKSPACE} id={id} defaultValues={defaultValues} />
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
								layout
								key={id}
								initial={{ opacity: 0, y: -20 * i }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 20 * i }}
								transition={{ duration: 0.5 }}
								className={`p-4 rounded ${gradientColors[color]}`}
							>
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
