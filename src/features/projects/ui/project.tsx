import { CreateDialog } from '~/features/create-dialog';
import { CREATED_PAGE_TYPE, PROJECT_TEXT } from '~/shared/lib/utils/static';
import { EmptyResultMessage } from '~/shared/ui/empty-result-message';
import { ErrorMessage } from '~/shared/ui/error-message';
import { ProjectItem } from '~/features/projects/ui/components/project-item';
import { useGetProjects } from '~/features/projects';
import { AnimatePresence, motion } from 'framer-motion';
import { gradientColors } from '~/shared/lib/utils/constants';
import { useEffect, useState } from 'react';
import { CreateDialogFormProps } from '~/features/create-dialog/ui/create-dialog';
import { ROUTES } from '~/shared/lib/utils/urls';
import { useParams } from '@remix-run/react';

const Projects = () => {
	const { workspaceId } = useParams();

	const [defaultValue, setDefaultValue] = useState<CreateDialogFormProps>();
	const [id, setId] = useState<string>();

	const { projects, error } = useGetProjects();

	useEffect(() => {
		if (!id) return;
		handleSetFormDefaultValues(id);

		return () => setDefaultValue(undefined);
	}, [id]);

	const handleSetFormDefaultValues = (id: string) => {
		const project = projects.find(project => project.id === id);

		if (!project) return;

		const { name, description, color, icon } = project;

		setDefaultValue({
			name,
			description,
			color: String(color),
			icon,
		});
	};

	return (
		<>
			<header className={'flex items-center justify-between mb-6'}>
				<header>
					<h1 className={'mb-1 text-4xl sm:text-6xl font-bold'}>
						{PROJECT_TEXT.title}
					</h1>
					<p className={'text-md'}>{PROJECT_TEXT.description}</p>
				</header>

				<CreateDialog
					type={CREATED_PAGE_TYPE.PROJECT}
					id={id}
					handleSetId={setId}
					defaultValue={defaultValue}
					formAction={`${ROUTES.DASHBOARD}/${workspaceId}`}
				/>

				{/*TODO ADD FILTERS*/}
			</header>

			{!projects?.length && !error && <EmptyResultMessage />}

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
					{projects?.map((project, i) => {
						const { id, color } = project;

						return (
							<motion.article
								layout
								key={id}
								initial={{ opacity: 0, y: -20 * i }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 20 * i }}
								transition={{ duration: 0.5 }}
								className={`p-4 rounded ${gradientColors[color]}`}>
								<ProjectItem project={project} handleSetId={setId} />
							</motion.article>
						);
					})}
				</AnimatePresence>
			</section>
		</>
	);
};

export { Projects };
