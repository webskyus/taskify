import { useEffect, useState } from 'react';
import { Project, Workspace } from '~/routes/dashboard';
import { CreateDialogFormProps } from '~/features/create-dialog/ui/create-dialog';

const useSetFormDefaultValues = (
	id: string | undefined,
	data: Workspace[] | Project[]
) => {
	const [defaultValue, setDefaultValue] = useState<CreateDialogFormProps>();

	useEffect(() => {
		if (!id) return;
		handleSetFormDefaultValues(id);

		return () => setDefaultValue(undefined);
	}, [id]);

	const handleSetFormDefaultValues = (id: string) => {
		const _data = data.find(item => item.id === id);

		if (!_data) return;

		const { name, description, color, icon } = _data;

		setDefaultValue({
			name,
			description,
			color: String(color),
			icon,
		});
	};

	return {
		defaultValue,
	};
};

export { useSetFormDefaultValues };
