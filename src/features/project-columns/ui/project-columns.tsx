import { useEffect, useState } from 'react';
import {
	CreateColumnDialog,
	useSetCreateColumnDialogForm,
} from '~/features/create-column-dialog';
import { useLoaderData, useOutletContext, useParams } from '@remix-run/react';
import { loader } from '~/routes/dashboard_.$workspaceId_.$projectId';
import { ProjectColumnsItem } from '~/features/project-columns/ui/components/project-columns-item';
import { EmptyResultMessage } from '~/shared/ui/empty-result-message';
import { ErrorMessage } from '~/shared/ui/error-message';
import {
	updateProjectColumnApi,
	useGetProjectColumns,
} from '~/features/project-columns';
import { getCurrentInfo } from '~/shared/lib/utils';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { SupabaseClient } from '@supabase/supabase-js';
import { ProjectColumn, ProjectTask } from '~/routes/dashboard';
import { reorder, reorderTasks } from '~/shared/lib/utils/dnd';
import {
	CreateTaskDialog,
	useSetCreateTaskDialogForm,
} from '~/features/create-task-dialog';
import { useGetProjectTasks } from '~/features/project-tasks';
import { getListStyle } from '~/features/project-columns/ui/style';
import { updateProjectTaskApi } from '~/features/project-tasks/api';

const ProjectColumns = () => {
	const { supabase } = useOutletContext<{
		supabase: SupabaseClient;
	}>();

	const { projectId } = useParams();
	const { projects } = useLoaderData<typeof loader>();
	const { projectColumns, error } = useGetProjectColumns();
	const { projectTasks } = useGetProjectTasks();

	const [editedProjectColumnId, setEditedProjectColumnId] = useState<string>();
	const [projectColumnId, setProjectColumnId] = useState<string>();
	const [editedProjectTaskId, setEditedProjectTaskId] = useState<string>();
	const [createTaskDialogState, setCreateTaskDialogState] = useState(false);
	const [columns, setColumns] = useState<ProjectColumn[]>(projectColumns);
	const [tasks, setTasks] = useState<ProjectTask[]>(projectTasks);

	const { defaultValue: projectColumnDefaultValue } =
		useSetCreateColumnDialogForm(editedProjectColumnId, projectColumns);
	const { defaultValue: projectTaskDefaultValue } = useSetCreateTaskDialogForm(
		editedProjectTaskId,
		projectTasks
	);
	const { name, description } = getCurrentInfo(projects, projectId);

	useEffect(() => {
		handleReCheckProjectColumnsList(projectColumns);
	}, [projectColumns]);

	useEffect(() => {
		handleReCheckProjectTasksList(projectTasks);
	}, [projectTasks]);

	const handleReCheckProjectColumnsList = (projectColumns: ProjectColumn[]) => {
		const projectColumnIds = projectColumns.map(
			projectColumn => projectColumn.id
		);
		const checkColumnNames = columns.filter(column => {
			const findMatchedProjectColumn = projectColumns.find(
				projectColumn => projectColumn.id === column.id
			);
			if (
				projectColumnIds.includes(column.id) &&
				column.name !== findMatchedProjectColumn?.name
			) {
				return column;
			}
		});

		(columns.length !== projectColumns.length || checkColumnNames.length) &&
			setColumns(projectColumns);
	};

	const handleReCheckProjectTasksList = (projectTasks: ProjectTask[]) => {
		const projectTaskIds = projectTasks.map(projectColumn => projectColumn.id);
		const checkTaskNames = tasks.filter(task => {
			const findMatchedProjectTask = projectTasks.find(
				projectTask => projectTask.id === task.id
			);
			if (
				projectTaskIds.includes(task.id) &&
				task.name !== findMatchedProjectTask?.name
			) {
				return task;
			}
		});

		(tasks.length !== projectTasks.length || checkTaskNames.length) &&
			setTasks(projectTasks);
	};

	const onDragEnd = async (result: DropResult) => {
		const { destination, source, draggableId, type } = result;
		const data = getCurrentInfo(projectColumns, draggableId);
		const formData = { ...data, id: draggableId };

		if (!destination) return;

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		)
			return;

		if (type === 'column') {
			const _ordered = reorder(columns, source.index, destination.index);

			setColumns(_ordered);

			return await updateProjectColumnApi({
				supabase,
				formData,
				projectColumns: _ordered,
			});
		}

		if (type === 'task') {
			const { tasks: _tasks } = reorderTasks({
				tasks,
				source,
				destination,
			});

			setTasks(_tasks as ProjectTask[]);

			return await updateProjectTaskApi({
				supabase,
				formData,
				projectTasks: _tasks,
			});
		}
	};

	return (
		<>
			<header className={'flex items-center justify-between mb-6'}>
				<header>
					<h1 className={'mb-1 text-4xl sm:text-6xl font-bold'}>{name}</h1>
					<p className={'text-md'}>{description}</p>
				</header>

				<CreateColumnDialog
					handleSetId={setEditedProjectColumnId}
					id={editedProjectColumnId}
					defaultValue={projectColumnDefaultValue}
				/>
			</header>

			<EmptyResultMessage state={!columns?.length && !error} />
			<ErrorMessage state={error} />

			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId='board' type='column' direction='horizontal'>
					{(provided, snapshot) => (
						<section
							style={getListStyle(snapshot.isDraggingOver)}
							{...provided.droppableProps}
							ref={provided.innerRef}>
							{columns.map((data, index) => {
								const { id } = data;

								return (
									<ProjectColumnsItem
										key={id}
										handleSetEditedProjectColumnId={setEditedProjectColumnId}
										handleSetOpenedTaskProjectColumnId={setProjectColumnId}
										handleSetEditedProjectTaskId={setEditedProjectTaskId}
										data={data}
										tasks={tasks.filter(task => task.project_column_id === id)}
										index={index}
										handleOpenCreateTaskDialog={setCreateTaskDialogState}
									/>
								);
							})}
							{provided.placeholder}
						</section>
					)}
				</Droppable>
			</DragDropContext>

			<CreateTaskDialog
				handleSetEditedTaskId={setEditedProjectTaskId}
				editedProjectTaskId={editedProjectTaskId}
				isOpen={createTaskDialogState}
				setIsOpen={setCreateTaskDialogState}
				projectColumnId={projectColumnId}
				defaultValue={projectTaskDefaultValue}
				projectColumnName={
					columns.filter(column => column.id === projectColumnId)[0]?.name
				}
			/>
		</>
	);
};

export { ProjectColumns };
