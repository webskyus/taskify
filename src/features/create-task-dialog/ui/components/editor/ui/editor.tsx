import {
	useState,
	lazy,
	useEffect,
	Suspense,
	FC,
	Dispatch,
	SetStateAction,
} from 'react';
const ReactQuill = lazy(() => import('react-quill'));
import { Loader } from '~/shared/ui/loader';
import 'react-quill/dist/quill.snow.css';
import type { ReactNode } from 'react';

interface Props {
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
}

const formats = [
	'header',
	'font',
	'size',
	'bold',
	'italic',
	'underline',
	'strike',
	'blockquote',
	'list',
	'bullet',
	'indent',
	'link',
	'image',
	'video',
];

const modules = {
	toolbar: [
		[{ header: [1, 2, 3, 4, 5, 6, false] }],
		[{ font: [] }, { header: '1' }, { header: '2' }],
		['bold', 'italic', 'underline', 'strike', 'blockquote'],
		[{ align: [] }],
		[
			{ list: 'ordered' },
			{ list: 'bullet' },
			{ indent: '-1' },
			{ indent: '+1' },
		],
		[{ script: 'sub' }, { script: 'super' }],
		[{ indent: '-1' }, { indent: '+1' }],
		[{ color: [] }, { background: [] }],
		[{ direction: 'rtl' }],
		['link', 'image', 'video'],
		['clean'],
	],
	clipboard: {
		// toggle to add extra line breaks when pasting HTML:
		matchVisual: false,
	},
};

const ClientOnly = ({ children }: { children: ReactNode }) => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return mounted ? <>{children}</> : null;
};

const Editor: FC<Props> = ({ value, setValue }) => {
	return (
		<ClientOnly>
			<Suspense fallback={<Loader state={true} />}>
				<ReactQuill
					theme={'snow'}
					onChange={setValue}
					value={value}
					modules={modules}
					formats={formats}
					placeholder={'Write something...'}
				/>
			</Suspense>
		</ClientOnly>
	);
};

export { Editor };
