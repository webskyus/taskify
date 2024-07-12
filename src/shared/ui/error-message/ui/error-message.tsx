import { motion } from 'framer-motion';

const ErrorMessage = () => {
	return (
		<motion.article
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 40 }}
			transition={{ duration: 0.3 }}
			className={'mt-40 p-4 text-center'}>
			<span className={'text-9xl'}>🐡</span>
			<h5 className={'text-4xl sm:text-9xl font-bold text-red-400'}>
				Someting went wrong...
			</h5>
			<p className={'mt-10 font-bold text-xl text-gray-300'}>
				Houston, we have a problem. Try reloading the page. If that doesn't
				help, we are working on it.
			</p>
		</motion.article>
	);
};

export { ErrorMessage };
