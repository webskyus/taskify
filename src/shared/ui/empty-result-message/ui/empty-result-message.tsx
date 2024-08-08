import { motion } from 'framer-motion';
import {FC} from "react";

interface Props {
	state: boolean
}

const EmptyResultMessage: FC<Props> = ({state}: Props) => {
	if (!state) return;

	return (
		<motion.article
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 40 }}
			transition={{ duration: 0.3 }}
			className={'mt-40 p-4 text-center'}>
			<span className={'text-9xl'}>🐡</span>
			<h5 className={'text-4xl sm:text-9xl font-bold text-pink-400'}>
				No Results Found
			</h5>
			<p className={'font-bold text-xl text-gray-300'}>
				We couldn't find any results matching your search criteria.
			</p>
		</motion.article>
	);
};

export { EmptyResultMessage };
