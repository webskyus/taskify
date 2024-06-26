import { FC } from 'react';
import { ROUTES } from '~/shared/lib/utils/urls';
import LogoIcon from '~/shared/assets/icons/logo';
import { Link } from '@remix-run/react';
import { Button } from '~/shared/ui/button';
import { AUTH_TYPE } from '~/shared/types/auth';
import { HEADER_AUTH_LINK_TEXT } from '~/shared/lib/utils/static';
import { ThemeSwitch } from '~/routes/action.set-theme';

interface Props {
	authType: AUTH_TYPE;
}

const AuthHeader: FC<Props> = props => {
	const { authType } = props;

	return (
		<header className={'flex justify-between items-center pt-4 mb-24 sm:mb-56'}>
			<Link unstable_viewTransition to={ROUTES.LANDING}>
				<LogoIcon className={'w-24 sm:w-40'} />
			</Link>

			<nav>
				<ul className={'flex items-center'}>
					<li className={'ml-2'}>
						<Button
							asChild
							variant={'link'}
							className={'text-foundation-primary-500'}>
							<Link unstable_viewTransition to={HEADER_AUTH_LINK_TEXT[authType].url}>
								{HEADER_AUTH_LINK_TEXT[authType].title}
							</Link>
						</Button>
					</li>

					<li className={'ml-2'}>
						<ThemeSwitch />
					</li>
				</ul>
			</nav>
		</header>
	);
};

export { AuthHeader };
