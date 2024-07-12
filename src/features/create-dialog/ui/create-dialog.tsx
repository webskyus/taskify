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
import { gradientColors } from '~/shared/lib/utils/constants';
import EmojiPicker, { Theme } from 'emoji-picker-react';
import { useTheme } from '~/routes/action.set-theme';
import { RadioGroup, RadioGroupItem } from '~/shared/ui/radio-group';
import { z } from 'zod';
import {
	useControlField,
	useIsSubmitting,
	ValidatedForm,
} from 'remix-validated-form';
import { withZod } from '@rvf/zod';
import { ROUTES } from '~/shared/lib/utils/urls';
import { Spinner } from '~/shared/ui/spinner';
import { useActionData } from '@remix-run/react';
import { HiSquaresPlus } from 'react-icons/hi2';

interface Props {
	type: `${CREATED_PAGE_TYPE}`;
	id?: string;
	handleSetId: Dispatch<SetStateAction<string | undefined>>;
	defaultValue?: CreateDialogFormProps;
	formAction: ROUTES.DASHBOARD | `${ROUTES.DASHBOARD}/${string}`;
}

export type CreateDialogFormProps = {
	id?: string;
	name: string;
	description: string;
	color: string;
	icon: string;
};

export const validator = withZod(
	z.object({
		name: z.string().min(5, {
			message: 'Minimum 5 characters required',
		}),
		description: z.string().min(10, {
			message: 'Minimum 10 characters required',
		}),
		icon: z.string(),
		color: z.string(),
		id: z.string().optional(),
	})
);

const CreateDialog: FC<Props> = ({
									 id,
									 handleSetId,
									 type,
									 defaultValue,
									 formAction
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formId, _] = useState('create-dialog-form');
	const [value, setValue] = useControlField('icon', formId);

	const actionData = useActionData();
	const theme = useTheme();
	const isSubmitting = useIsSubmitting(formId);

	useEffect(() => {
		if (!id) return;
		setIsOpen(true);
	}, [id, defaultValue]);

	useEffect(() => {
		console.log('actionData', actionData)
		if (actionData && isOpen) {
			setIsOpen(false);
		}

		if (!isOpen) {
			handleSetId && handleSetId(undefined);
		}
	}, [actionData, isOpen]);

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
					validator={validator}
					defaultValues={{
						...defaultValue,
						color: String(defaultValue?.color) || '0',
					}}
					navigate={false}
					action={formAction}>
					<Input type='hidden' name='id' value={id || ''} />

					<DialogHeader>
						<DialogTitle>{CREATE_DIALOG_TEXT[type].title}</DialogTitle>
						<DialogDescription className={'!mb-4'}>
							{CREATE_DIALOG_TEXT[type].description}
						</DialogDescription>
					</DialogHeader>

					<article>
						<div className={'mb-3'}>
							<Label htmlFor={'name'} className={'block mb-3'}>
								Name
							</Label>

							<div className={'flex items-baseline'}>
								<Input
									id='card-emoji'
									name={'icon'}
									readOnly
									value={(value as string) || '✋'}
									className={'w-10 p-0 mr-2 text-2xl border-0 outline-0'}
								/>

								<div className={'w-full'}>
									<Input
										id='name'
										name={'name'}
										type={'text'}
										placeholder={`DeltaX Workspace...`}
									/>
								</div>
							</div>
						</div>

						<div className={'mb-6'}>
							<EmojiPicker
								width={'100%'}
								lazyLoadEmojis={true}
								reactionsDefaultOpen={true}
								onEmojiClick={({ emoji }) => setValue(emoji)}
								theme={theme as Theme}
							/>
						</div>

						<div className={'mb-6'}>
							<Label htmlFor={'description'} className={'block mb-3'}>
								Description
							</Label>
							<Input
								id='description'
								name={'description'}
								type={'text'}
								placeholder={`My lovely workspace for DeltaX company projects...`}
							/>
						</div>

						<div className={'mb-6'}>
							<Label htmlFor={'card-color'} className={'block mb-2'}>
								Color
							</Label>
							<RadioGroup
								name={'color'}
								defaultValue={defaultValue?.color || '0'}
								className={'flex w-[380px] pr-2 pb-2 overflow-x-auto'}>
								<RadioGroupItem
									value='0'
									id='r1'
									className={`min-w-10 min-h-10 rounded-full ${gradientColors[0]}`}
								/>
								<RadioGroupItem
									value='1'
									id='r2'
									className={`min-w-10 min-h-10 ml-2 rounded-full ${gradientColors[1]}`}
								/>
								<RadioGroupItem
									value='2'
									id='r3'
									className={`min-w-10 min-h-10 ml-2 rounded-full ${gradientColors[2]}`}
								/>
								<RadioGroupItem
									value='3'
									id='r4'
									className={`min-w-10 min-h-10 ml-2 rounded-full ${gradientColors[3]}`}
								/>
								<RadioGroupItem
									value='4'
									id='r5'
									className={`min-w-10 min-h-10 ml-2 rounded-full ${gradientColors[4]}`}
								/>
								<RadioGroupItem
									value='5'
									id='r6'
									className={`min-w-10 min-h-10 ml-2 rounded-full ${gradientColors[5]}`}
								/>
								<RadioGroupItem
									value='6'
									id='r7'
									className={`min-w-10 min-h-10 ml-2 rounded-full ${gradientColors[6]}`}
								/>
								<RadioGroupItem
									value='7'
									id='r8'
									className={`min-w-10 min-h-10 ml-2 rounded-full ${gradientColors[7]}`}
								/>
								<RadioGroupItem
									value='8'
									id='r9'
									className={`min-w-10 min-h-10 ml-2 rounded-full ${gradientColors[8]}`}
								/>
								<RadioGroupItem
									value='9'
									id='r10'
									className={`min-w-10 min-h-10 ml-2 rounded-full ${gradientColors[9]}`}
								/>
							</RadioGroup>
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

export { CreateDialog };
