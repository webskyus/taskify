import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '~/shared/ui/dropdown-menu';
import { Button } from '~/shared/ui/button';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';

const ProjectColumnsItem = () => {
	return (
		<article
			className={
				'min-w-[400px] min-h-[200px] h-auto p-4 mr-4 rounded-sm bg-slate-200 dark:bg-slate-800'
			}>
			<header className={'flex items-start justify-between'}>
				<p className={'text-slate-800 dark:text-slate-200'}>Column name</p>
				<DropdownMenu>
					<DropdownMenuTrigger>
						<Button
							variant={'link'}
							className={'!h-6 !p-0 hover:opacity-50 transition-opacity'}>
							<HiOutlineDotsHorizontal size={28} />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>Edit</DropdownMenuItem>
						<DropdownMenuItem className={'text-red-400'}>
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</header>
		</article>
	);
};

export { ProjectColumnsItem };
