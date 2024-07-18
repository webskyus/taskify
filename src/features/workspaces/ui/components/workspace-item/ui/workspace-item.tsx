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
import { Link } from '@remix-run/react';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { Workspace } from '~/routes/dashboard';
import { useGetWorkspaceCrud } from '~/features/workspaces';

interface Props {
	workspace: Workspace;
	handleSetId: Dispatch<SetStateAction<string | undefined>>;
}

const WorkspaceItem: FC<Props> = ({ workspace, handleSetId }) => {
	const { id, name, color, icon, created_at, description } = workspace;
	const url = `${ROUTES.DASHBOARD}/${id}`;
	const { handleDeleteWorkspace } = useGetWorkspaceCrud();

	const handleUpdateWorkspace = (id: string) => handleSetId(id);

	return (
		<>
			<header className={'flex items-start justify-between'}>
				<Link unstable_viewTransition to={url}>
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
						<DropdownMenuItem onClick={() => handleUpdateWorkspace(id)}>
							Edit
						</DropdownMenuItem>
						<DropdownMenuItem
							className={'text-red-400'}
							onClick={() => handleDeleteWorkspace(id)}>
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

export { WorkspaceItem };
