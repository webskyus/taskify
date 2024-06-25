import { FC, useState } from 'react';
import { Button } from '~/shared/ui/button';
import { LuMessageSquarePlus } from 'react-icons/lu';
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
import { useIsSubmitting, ValidatedForm } from 'remix-validated-form';
import { withZod } from '@rvf/zod';
import { ROUTES } from '~/shared/lib/utils/urls';

interface Props {
	type: `${CREATED_PAGE_TYPE}`;
}

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
	})
);

const CreateDialog: FC<Props> = ({ type }) => {
	const theme = useTheme();
	const isSubmitting = useIsSubmitting('create-dialog-form');
	const [icon, setIcon] = useState('🌈');

	return (
		<Dialog>
			<DialogTrigger asChild onClick={() => setIcon('🌈')}>
				<Button variant={'ghost'} size={'icon'} className={'text-6xl'}>
					<LuMessageSquarePlus className={'stroke-green-400'} />
				</Button>
			</DialogTrigger>

			<DialogContent>
				<ValidatedForm
					id={'create-dialog-form'}
					method='post'
					validator={validator}
					action={ROUTES.DASHBOARD}>
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
									className={'w-10 p-0 mr-2 text-2xl border-0'}
									value={icon}
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
								onEmojiClick={({emoji}) => setIcon(emoji)}
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
								defaultValue='0'
								name={'color'}
								className={'flex w-[450px] pr-2 pb-2 overflow-x-auto'}>
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
							{
								!isSubmitting
									? <div className={'flex items-center'}>
										<div
											className="w-4 h-4 p-1 bg-pink-400 rounded-full flex items-center justify-center">
											<div className="w-4 h-1 bg-white animate-spin rounded-lg"></div>
										</div>
										Creating
									</div>
									: 'Create'
							}
						</Button>
					</DialogFooter>
				</ValidatedForm>
			</DialogContent>
		</Dialog>
	);
};

export {CreateDialog};
