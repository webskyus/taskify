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
	DialogTrigger,
} from '~/shared/ui/dialog';
import {
	CREATE_DIALOG_TEXT,
	CREATED_PAGE_TYPE,
} from '~/shared/lib/utils/static';
import { Label } from '~/shared/ui/label';
import { Input } from '~/shared/ui/input';
import { useTheme } from '~/routes/action.set-theme';
import { z } from 'zod';
import { useIsSubmitting, ValidatedForm } from 'remix-validated-form';
import { withZod } from '@rvf/zod';
import { ROUTES } from '~/shared/lib/utils/urls';
import { Spinner } from '~/shared/ui/spinner';
import { useActionData, useParams } from '@remix-run/react';
import { HiSquaresPlus } from 'react-icons/hi2';

interface Props {
	id?: string;
	handleSetId: Dispatch<SetStateAction<string | undefined>>;
	defaultValue?: CreateColumnDialogFormProps;
}

export type CreateColumnDialogFormProps = {
	id?: string;
	name: string;
};

export const createColumnDialogValidator = withZod(
	z.object({
		name: z.string().min(4, {
			message: 'Minimum 4 characters required',
		}),
		id: z.string().optional(),
	})
);

const CreateColumnDialog: FC<Props> = ({ id, handleSetId, defaultValue }) => {
	const { workspaceId, projectId } = useParams();

	const [isOpen, setIsOpen] = useState(false);
	const [formId, _] = useState('create-column-dialog-form');

	const actionData = useActionData();
	const isSubmitting = useIsSubmitting(formId);

	useEffect(() => {
		if (!id) return;
		setIsOpen(true);
	}, [id, defaultValue]);

	useEffect(() => {
		if (actionData && isOpen) {
			setIsOpen(false);
		}
	}, [actionData]);

	useEffect(() => {
		if (!isOpen) {
			handleSetId && handleSetId(undefined);
		}
	}, [isOpen]);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant={'ghost'} size={'icon'} className={'text-6xl'}>
					<HiSquaresPlus className={'fill-green-400'} />
				</Button>
			</DialogTrigger>

			<DialogContent>
				<ValidatedForm
					id={formId}
					method={id ? 'put' : 'post'}
					validator={createColumnDialogValidator}
					defaultValues={defaultValue}
					navigate={false}
					action={`${ROUTES.DASHBOARD}/${workspaceId}/${projectId}`}>
					<Input type='hidden' name='id' value={id || ''} />

					<DialogHeader>
						<DialogTitle>
							{CREATE_DIALOG_TEXT[CREATED_PAGE_TYPE.PROJECT_COLUMN].title}
						</DialogTitle>
						<DialogDescription className={'!mb-4'}>
							{CREATE_DIALOG_TEXT[CREATED_PAGE_TYPE.PROJECT_COLUMN].description}
						</DialogDescription>
					</DialogHeader>

					<article>
						<div className={'mb-3'}>
							<Label htmlFor={'name'} className={'block mb-3'}>
								Name
							</Label>

							<Input
								id='name'
								name={'name'}
								type={'text'}
								placeholder={`Column name...`}
							/>
						</div>
					</article>

					<DialogFooter>
						<DialogClose asChild>
							<Button type={'button'} variant={'link'}>
								Close
							</Button>
						</DialogClose>
						<Button variant={'secondary'} disabled={isSubmitting}>
							<Spinner text={!id ? 'Create' : 'Update'} state={isSubmitting} />
						</Button>
					</DialogFooter>
				</ValidatedForm>
			</DialogContent>
		</Dialog>
	);
};

export { CreateColumnDialog };
