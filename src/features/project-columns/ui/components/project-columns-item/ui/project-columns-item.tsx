import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '~/shared/ui/dropdown-menu';
import { Button } from '~/shared/ui/button';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import {FC} from "react";
import {ProjectColumn} from "~/routes/dashboard";
import {FcPlus} from "react-icons/fc";
import {BsFolderPlus} from "react-icons/bs";

interface Props {
	data: ProjectColumn
}

const ProjectColumnsItem: FC<Props> = ({data}) => {
	const {name} = data;

	return (
		<article
			className={
				`
					flex flex-col 
					min-w-[400px] min-h-[200px] h-auto 
					p-4 mr-4 
					rounded-sm bg-slate-200 
					group transition-opacity
					dark:bg-slate-800 
				`
			}>
			<header className={'flex items-start justify-between'}>
				<p className={'text-slate-800 dark:text-slate-200'}>
					{name}
				</p>
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

			<Button className={'mt-auto transition-opacity opacity-0 group-hover:opacity-100 uppercase'}>
				<BsFolderPlus className={'mr-1'} />
				New Task
			</Button>
		</article>
	);
};

export { ProjectColumnsItem };
