import { Link, } from '@remix-run/react';
import { ROUTES } from '~/shared/lib/utils/urls';
import LogoIcon from '~/shared/assets/icons/logo';
import { ProfilePanel } from '~/features/profile-panel';
import { BreadCrumbs } from '~/features/breadcrumbs';
import { FC } from 'react';
import { Project, Workspace } from '~/routes/dashboard';

interface Props {
	workspaces?: Workspace[];
	projects?: Project[];
}

const DashboardHeader: FC<Props> = ({ workspaces, projects }) => {
	return (
		<header className={'flex justify-between items-center pt-4 mb-24'}>
			<Link unstable_viewTransition to={ROUTES.DASHBOARD} className={'w-14'}>
				<LogoIcon className={'w-36 sm:w-40'} />
			</Link>
			<BreadCrumbs workspaces={workspaces} projects={projects} />
			<ProfilePanel />
		</header>
	);
};

export { DashboardHeader };
