import { FC } from 'react';
import { Link, useParams } from '@remix-run/react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '~/shared/ui/dropdown-menu';
import { ROUTES } from '~/shared/lib/utils/urls';
import { Project } from '~/routes/dashboard';

interface Props {
	projects?: Project[];
}

const ProjectDropdownItems: FC<Props> = ({ projects }) => {
	const { projectId, workspaceId } = useParams();
	const currentProjectName = projects?.find(({ id }) => id === projectId);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				className={'flex items-center leading-[12px] text-[14px] font-medium'}>
				{currentProjectName?.name}
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				{projects?.map(project => {
					const { name, id } = project;

					return (
						<DropdownMenuItem key={id}>
							<Link
								unstable_viewTransition
								to={`${ROUTES.DASHBOARD}/${workspaceId}/${id}`}>
								{name}
							</Link>
						</DropdownMenuItem>
					);
				})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export { ProjectDropdownItems };
