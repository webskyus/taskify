import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '~/shared/ui/dropdown-menu';
import { Button } from '~/shared/ui/button';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { FC } from 'react';
import { ProjectColumn } from '~/routes/dashboard';
import { BsFolderPlus } from 'react-icons/bs';
import {Draggable} from "react-beautiful-dnd";

interface Props {
	data: ProjectColumn;
	index: number
}

const ProjectColumnsItem: FC<Props> = ({ data, index }) => {
	const { name, id } = data;

	return (
		<Draggable draggableId={id} index={index}>
			{(provided, snapshot) => {
				return <article ref={provided.innerRef}
								{...provided.draggableProps}
					className={`
						flex flex-col 
						min-w-[400px] h-auto 
						p-4 mr-4 
						rounded-sm bg-slate-200 
						group transition-opacity
						dark:bg-slate-800 
					`}>
					<header className={'flex items-start justify-between mb-2'}>
						<p className={'text-slate-800 dark:text-slate-200'}
						   {...provided.dragHandleProps}>
							{name}
						</p>
						<DropdownMenu>
							<DropdownMenuTrigger>
								<Button
									variant={'link'}
									className={'!h-6 !p-0 hover:opacity-50 transition-opacity'}>
									<HiOutlineDotsHorizontal size={28}/>
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

					{/*<ul className={'mb-2'}>*/}
					{/*	<li className={'w-full p-2 rounded-md bg-pink-400'}>*/}
					{/*		Item 1*/}
					{/*	</li>*/}
					{/*</ul>*/}

					<Button
						className={
							'mt-auto transition-opacity opacity-0 group-hover:opacity-100 uppercase'
						}>
						<BsFolderPlus className={'mr-1'}/>
						New Task
					</Button>
				</article>
			}}
		</Draggable>
	);
};

export {ProjectColumnsItem};
