import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '~/shared/ui/dropdown-menu';
import { Button } from '~/shared/ui/button';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { Dispatch, FC, SetStateAction } from 'react';
import { ProjectColumn, ProjectTask } from '~/routes/dashboard';
import { BsFolderPlus } from 'react-icons/bs';
import { Draggable } from 'react-beautiful-dnd';
import { useGetProjectColumnCrud } from '~/features/project-columns';
import { ProjectTasks } from '~/features/project-tasks';

interface Props {
	data: ProjectColumn;
	index: number;
	handleSetEditedProjectColumnId: Dispatch<SetStateAction<string | undefined>>;
	handleSetEditedProjectTaskId: Dispatch<SetStateAction<string | undefined>>;
	handleSetOpenedTaskProjectColumnId: Dispatch<
		SetStateAction<string | undefined>
	>;
	handleOpenCreateTaskDialog: Dispatch<SetStateAction<boolean>>;
	tasks: ProjectTask[];
}

const ProjectColumnsItem: FC<Props> = ({
	data,
	tasks,
	index,
	handleSetEditedProjectColumnId,
	handleSetOpenedTaskProjectColumnId,
	handleOpenCreateTaskDialog,
	handleSetEditedProjectTaskId,
}) => {
	const { name, id } = data;
	const { handleDeleteProjectColumn } = useGetProjectColumnCrud();

	const handleUpdateProjectColumn = (id: string) =>
		handleSetEditedProjectColumnId(id);

	const handleOpenModal = (id: string) => {
		handleSetOpenedTaskProjectColumnId(id);
		handleOpenCreateTaskDialog(true);
	};

	return (
		<Draggable draggableId={id} index={index}>
			{provided => {
				return (
					<article
						ref={provided.innerRef}
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
							<p
								className={'text-slate-800 dark:text-slate-200'}
								{...provided.dragHandleProps}>
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
									<DropdownMenuItem
										onClick={() => handleUpdateProjectColumn(id)}>
										Edit
									</DropdownMenuItem>
									<DropdownMenuItem
										className={'text-red-400'}
										onClick={() => handleDeleteProjectColumn(id)}>
										Delete
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</header>

						<ProjectTasks
							handleSetEditedProjectTaskId={handleSetEditedProjectTaskId}
							handleSetEditedProjectColumnId={
								handleSetOpenedTaskProjectColumnId
							}
							projectColumnId={id}
							data={tasks}
						/>

						<Button
							onClick={() => handleOpenModal(id)}
							className={
								'mt-auto transition-opacity opacity-[0.9] group-hover:opacity-100 uppercase'
							}>
							<BsFolderPlus className={'mr-1'} />
							New Task
						</Button>
					</article>
				);
			}}
		</Draggable>
	);
};

export { ProjectColumnsItem };
