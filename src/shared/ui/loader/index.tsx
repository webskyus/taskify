import { FC } from 'react';
import styles from './ui/style.module.css';

interface Props {
	state: boolean;
}

const Loader: FC<Props> = props => {
	const { state } = props;

	if (!state) return;
	return <span className={styles.loader} />;
};

export { Loader };
