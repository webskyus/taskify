import { useEffect, useState } from 'react';
import { ProjectColumn, ProjectTask } from '~/routes/dashboard';
import { CreateColumnDialogFormProps } from '~/features/create-column-dialog/ui/create-column-dialog';

const useSetCreateColumnDialogForm = (
	id: string | undefined,
	data: ProjectColumn[] | ProjectTask[]
) => {
	const [defaultValue, setDefaultValue] =
		useState<CreateColumnDialogFormProps>();

	useEffect(() => {
		if (!id) return;
		handleSetFormDefaultValues(id);

		return () => setDefaultValue(undefined);
	}, [id]);

	const handleSetFormDefaultValues = (id: string) => {
		const _data = data.find(item => item.id === id);

		if (!_data) return;

		const { name } = _data;

		setDefaultValue({
			name,
		});
	};

	return {
		defaultValue,
	};
};

export { useSetCreateColumnDialogForm };
