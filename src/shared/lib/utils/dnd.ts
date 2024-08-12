import { ProjectTask } from '~/routes/dashboard';
import { DraggableLocation } from 'react-beautiful-dnd';

interface ReorderTasksProps {
	tasks: ProjectTask[];
	source: DraggableLocation;
	destination: DraggableLocation;
}

const reorder = (list: any[], startIndex: number, endIndex: number) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);

	result.splice(endIndex, 0, removed);

	return result;
};

const reorderTasks = ({ tasks, source, destination }: ReorderTasksProps) => {
	const target = tasks.filter(
		task => task.project_column_id === source.droppableId
	)[source.index];

	const checkSourceIndex = tasks.findIndex(
		task => task.project_column_id === source.droppableId
	);
	const checkDestinationIndex = tasks.findIndex(
		task => task.project_column_id === destination.droppableId
	);
	const sourceIndex =
		checkSourceIndex === source.index
			? source.index
			: source.index + checkDestinationIndex;
	const destinationIndex =
		checkDestinationIndex === destination.index
			? destination.index
			: destination.index + checkDestinationIndex;

	// Drag and drop on the same column
	if (source.droppableId === destination.droppableId) {
		return {
			tasks: reorder(tasks, sourceIndex, destinationIndex),
		};
	}

	// Drag and drop on different column
	// Create original list and delete current dragged item
	// Create new list where we order items use index
	// After just concat old and new list
	const _tasks = [
		...tasks.filter(task => task.project_column_id !== destination.droppableId),
	];
	const _res = [
		...tasks.filter(task => task.project_column_id === destination.droppableId),
	] as ProjectTask[];

	_res.splice(destination.index, 0, {
		...target,
		project_column_id: destination.droppableId,
	});

	_tasks.splice(
		_tasks.findIndex(task => task.id === target.id),
		1
	);

	return {
		tasks: _tasks.concat(_res) as ProjectTask[],
	};
};

export { reorder, reorderTasks };
