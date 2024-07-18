import { Dispatch, FC, SetStateAction } from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '~/shared/ui/dropdown-menu';
import { Button } from '~/shared/ui/button';
import { date } from '~/shared/lib/utils';
import { ROUTES } from '~/shared/lib/utils/urls';
import { Link, useParams } from '@remix-run/react';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { useGetProjectCrud } from '~/features/projects';
import { Project } from '~/routes/dashboard';

interface Props {
	project: Project;
	handleSetId: Dispatch<SetStateAction<string | undefined>>;
}

const ProjectItem: FC<Props> = ({ project, handleSetId }) => {
	const { id, name, color, icon, created_at, description } = project;
	const { workspaceId } = useParams();
	const url = `${ROUTES.DASHBOARD}/${workspaceId}/${id}`;
	const { handleDeleteProject } = useGetProjectCrud();

	const handleUpdateProject = (id: string) => handleSetId(id);

	console.log('dd.url', url);
	return (
		<>
			<header className={'flex items-start justify-between'}>
				<Link to={url} unstable_viewTransition discover='none' prefetch='none'>
					<p className={'mb-2 text-6xl'}>{icon}</p>
					<h2 className={'text-2xl font-bold line-clamp-1 text-white'}>
						{name}
					</h2>
				</Link>
				<DropdownMenu>
					<DropdownMenuTrigger>
						<Button
							variant={'link'}
							className={
								'!h-6 !p-0 hover:opacity-50 transition-opacity !text-white'
							}>
							<HiOutlineDotsHorizontal size={28} />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem onClick={() => handleUpdateProject(id)}>
							Edit
						</DropdownMenuItem>
						<DropdownMenuItem
							className={'text-red-400'}
							onClick={() => handleDeleteProject(id)}>
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</header>
			<p className={'mt-2 mb-4 line-clamp-3 text-white'}>{description}</p>
			<time dateTime={'24.12.2024'} className={'text-xs italic text-white'}>
				Created in {date(created_at)}
			</time>
		</>
	);
};

export { ProjectItem };
