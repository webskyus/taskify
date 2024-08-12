import { useEffect, useState } from 'react';
import { ProjectTask } from '~/routes/dashboard';
import { CreateTaskDialogFormProps } from '~/features/create-task-dialog/ui/create-task-dialog';

const useSetCreateTaskDialogForm = (
	id: string | undefined,
	data: ProjectTask[]
) => {
	const [defaultValue, setDefaultValue] = useState<CreateTaskDialogFormProps>();

	useEffect(() => {
		if (!id) return;
		handleSetFormDefaultValues(id);

		return () => setDefaultValue(undefined);
	}, [id]);

	const handleSetFormDefaultValues = (id: string) => {
		const _data = data.find(item => item.id === id);

		if (!_data) return;

		const { name, content } = _data;

		setDefaultValue({
			name,
			content: content || undefined,
		});
	};

	return {
		defaultValue,
	};
};

export { useSetCreateTaskDialogForm };
