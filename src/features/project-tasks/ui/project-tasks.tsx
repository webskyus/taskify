import { Dispatch, FC, SetStateAction } from 'react';
import { ProjectTask } from '~/routes/dashboard';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '~/shared/ui/dropdown-menu';
import { Button } from '~/shared/ui/button';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { useGetProjectTaskCrud } from '~/features/project-tasks';

interface ProjectColumnTasksProps {
	data: ProjectTask[];
	projectColumnId: string;
	handleSetEditedProjectTaskId: Dispatch<SetStateAction<string | undefined>>;
	handleSetEditedProjectColumnId: (id: string) => void;
}

const ProjectTasks: FC<ProjectColumnTasksProps> = ({
	data,
	projectColumnId,
	handleSetEditedProjectColumnId,
	handleSetEditedProjectTaskId,
}) => {
	const { handleDeleteProjectTask } = useGetProjectTaskCrud();

	const handleUpdateProjectTask = (id: string) => {
		handleSetEditedProjectTaskId(id);
		handleSetEditedProjectColumnId(projectColumnId);
	};

	return (
		<Droppable droppableId={projectColumnId} type={'task'}>
			{dropProvided => (
				<article {...dropProvided.droppableProps}>
					<article
						className={'max-w-[368px] min-h-4'}
						ref={dropProvided.innerRef}>
						{data.map((task, index) => {
							return (
								<Draggable key={task.id} draggableId={task.id} index={index}>
									{(dragProvided, dragSnapshot) => {
										return (
											<li
												key={task.id}
												ref={dragProvided.innerRef}
												data-testid={task.id}
												data-index={index}
												aria-label={`${task.name}`}
												className={`
			                                flex justify-between items-center
			                                max-w-[370px]
			                                p-3 mb-2 
			                                line-clamp-2
			                                border-l-2 border-fuchsia-600
			                                rounded-md text-black bg-slate-300  
			                                dark:bg-slate-900 dark:text-white 
			                            `}
												{...dragProvided.draggableProps}
												{...dragProvided.dragHandleProps}>
												<span>{task.name}</span>

												<DropdownMenu>
													<DropdownMenuTrigger>
														<Button
															variant={'link'}
															className={`!h-6 !p-0 transition-opacity`}>
															<HiOutlineDotsHorizontal size={20} />
														</Button>
													</DropdownMenuTrigger>
													<DropdownMenuContent>
														<DropdownMenuItem
															onClick={() => handleUpdateProjectTask(task.id)}>
															Edit
														</DropdownMenuItem>
														<DropdownMenuItem
															className={'text-red-400'}
															onClick={() => handleDeleteProjectTask(task.id)}>
															Delete
														</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</li>
										);
									}}
								</Draggable>
							);
						})}
						{dropProvided.placeholder}
					</article>
				</article>
			)}
		</Droppable>
	);
};

export { ProjectTasks };
