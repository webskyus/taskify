import React, { FC } from 'react';
import { ROUTES } from '~/shared/lib/utils/urls';
import LogoIcon from '~/shared/assets/icons/logo';
import { Link } from '@remix-run/react';
import { Button } from '~/shared/ui/button';
import { AUTH_TYPE } from '~/shared/types/auth';
import { HEADER_AUTH_LINK_TEXT } from '~/shared/lib/utils/static';

interface Props {
	authType: AUTH_TYPE;
}

export const AuthHeader: FC<Props> = props => {
	const { authType } = props;

	return (
		<header className={'flex justify-between items-center pt-4 mb-24 sm:mb-56'}>
			<Link to={ROUTES.LANDING}>
				<LogoIcon className={'w-24 sm:w-40'} />
			</Link>

			<nav>
				<ul className={'flex items-center'}>
					<li>
						<Button
							asChild
							variant={'link'}
							className={'text-foundation-primary-500'}>
							<Link to={HEADER_AUTH_LINK_TEXT[authType].url}>
								{HEADER_AUTH_LINK_TEXT[authType].title}
							</Link>
						</Button>
					</li>
				</ul>
			</nav>
		</header>
	);
};
