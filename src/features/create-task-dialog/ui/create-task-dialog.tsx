import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { Button } from '~/shared/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '~/shared/ui/dialog';
import {
	CREATE_DIALOG_TEXT,
	CREATED_PAGE_TYPE,
} from '~/shared/lib/utils/static';
import { Label } from '~/shared/ui/label';
import { Input } from '~/shared/ui/input';
import { z } from 'zod';
import { useIsSubmitting, ValidatedForm } from 'remix-validated-form';
import { withZod } from '@rvf/zod';
import { ROUTES } from '~/shared/lib/utils/urls';
import { Spinner } from '~/shared/ui/spinner';
import { useActionData, useParams } from '@remix-run/react';
import { Editor } from '~/features/create-task-dialog/ui/components/editor';
import { FORM_IDS } from '~/shared/lib/utils/constants';

interface Props {
	editedProjectTaskId?: string;
	handleSetEditedTaskId: Dispatch<SetStateAction<string | undefined>>;
	defaultValue?: CreateTaskDialogFormProps;
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	projectColumnId?: string;
	projectColumnName: string;
}

export type CreateTaskDialogFormProps = {
	id?: string;
	projectColumnId?: string;
	name: string;
	content?: string;
};

export const createTaskDialogValidator = withZod(
	z.object({
		name: z.string().min(4, {
			message: 'Minimum 4 characters required',
		}),
		content: z.string().optional(),
		id: z.string().optional(),
		projectColumnId: z.string().optional(),
	})
);

const CreateTaskDialog: FC<Props> = ({
	editedProjectTaskId,
	handleSetEditedTaskId,
	defaultValue,
	isOpen,
	setIsOpen,
	projectColumnId,
	projectColumnName,
}) => {
	const [value, setValue] = useState('');

	const { workspaceId, projectId } = useParams();

	const actionData = useActionData();
	const isSubmitting = useIsSubmitting(FORM_IDS.CREATE_TASK_DIALOG_FORM);

	useEffect(() => {
		if (!editedProjectTaskId) return;
		setIsOpen(true);

		if (defaultValue) {
			setValue(defaultValue.content || '');
		}
	}, [editedProjectTaskId, defaultValue]);

	useEffect(() => {
		console.log('isOpen', isOpen);
	}, [isOpen]);

	useEffect(() => {
		if (actionData && isOpen) {
			setIsOpen(false);
			setValue('');
		}
	}, [actionData]);

	useEffect(() => {
		if (!isOpen) {
			handleSetEditedTaskId && handleSetEditedTaskId(undefined);
			setValue('');
		}
	}, [isOpen]);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogContent className={'!max-w-[1200px]'}>
				<ValidatedForm
					id={FORM_IDS.CREATE_TASK_DIALOG_FORM}
					method={editedProjectTaskId ? 'put' : 'post'}
					validator={createTaskDialogValidator}
					defaultValues={{
						name: defaultValue?.name,
						content: defaultValue?.content as string | undefined,
					}}
					navigate={false}
					action={`${ROUTES.DASHBOARD}/${workspaceId}/${projectId}`}>
					<Input type='hidden' name='id' value={editedProjectTaskId || ''} />
					<Input
						type='hidden'
						name='projectColumnId'
						value={projectColumnId || ''}
					/>
					<Input type='hidden' name='content' value={value} />

					<DialogHeader>
						<DialogTitle>
							{CREATE_DIALOG_TEXT[CREATED_PAGE_TYPE.PROJECT_COLUMN_TASK].title}{' '}
							for {projectColumnName}
						</DialogTitle>
						<DialogDescription className={'!mb-4'}>
							{
								CREATE_DIALOG_TEXT[CREATED_PAGE_TYPE.PROJECT_COLUMN_TASK]
									.description
							}
						</DialogDescription>
					</DialogHeader>

					<article>
						<div className={'mb-3'}>
							<Label htmlFor={'name'} className={'block mb-3'}>
								Task name
							</Label>

							<Input
								id='name'
								name={'name'}
								type={'text'}
								placeholder={`Task name...`}
							/>
						</div>
						<div className={'mb-3'}>
							<Label htmlFor={'content'} className={'block mb-3'}>
								Content
							</Label>

							<Editor value={value} setValue={setValue} />
						</div>
					</article>

					<DialogFooter>
						<DialogClose asChild>
							<Button type={'button'} variant={'link'}>
								Close
							</Button>
						</DialogClose>
						<Button variant={'secondary'} disabled={isSubmitting}>
							<Spinner
								text={!editedProjectTaskId ? 'Create' : 'Update'}
								state={isSubmitting}
							/>
						</Button>
					</DialogFooter>
				</ValidatedForm>
			</DialogContent>
		</Dialog>
	);
};

export { CreateTaskDialog };
