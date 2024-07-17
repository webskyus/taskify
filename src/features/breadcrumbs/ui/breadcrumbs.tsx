import { FC } from 'react';
import { HiChevronRight } from 'react-icons/hi';
import { useParams } from '@remix-run/react';
import { Project, Workspace } from '~/routes/dashboard';
import { WorkspaceDropdownItems } from '~/features/breadcrumbs/ui/components/workspace-dropdown-items';
import { ProjectDropdownItems } from '~/features/breadcrumbs/ui/components/project-dropdown-items';

interface Props {
	workspaces?: Workspace[];
	projects?: Project[];
}

const BreadCrumbs: FC<Props> = ({ workspaces, projects }) => {
	const { workspaceId, projectId } = useParams();
	if (!workspaceId) return <></>;

	if (workspaceId && !projectId) {
		return (
			<nav className={'hidden md:flex items-center mr-auto'}>
				<ul className={'flex items-center'}>
					<li className={'ml-2'}>
						<WorkspaceDropdownItems workspaces={workspaces} />
					</li>
				</ul>
			</nav>
		);
	}

	return (
		<nav className={'hidden md:flex items-center mr-auto'}>
			<ul className={'flex items-center'}>
				<li className={'ml-2'}>
					<WorkspaceDropdownItems workspaces={workspaces} />
				</li>
				<li className={'ml-1'}>
					<HiChevronRight size={20} />
				</li>
				<li className={'ml-1'}>
					<ProjectDropdownItems projects={projects} />
				</li>
			</ul>
		</nav>
	);
};

export { BreadCrumbs };
