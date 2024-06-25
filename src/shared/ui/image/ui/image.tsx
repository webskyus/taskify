import React, { FC } from 'react';
import { placeholder } from '~/shared/lib/utils/constants';

interface Props {
	key: string;
	url: string;
	alt: string;
	style: React.CSSProperties;
}

const Image: FC<Props> = props => {
	const { key, url, alt, style } = props;
	const styles: React.CSSProperties = {
		objectFit: 'cover',
		transition: 'opacity 300ms ease-in-out',
		width: '100%',
		height: '100%',
		...style,
	};

	return <img key={key} src={url || placeholder} alt={alt} style={styles} />;
};

export { Image };
