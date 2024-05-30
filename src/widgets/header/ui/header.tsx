import { Link } from '@remix-run/react';
import { ROUTES } from '~/shared/lib/utils/urls';
import LogoIcon from '~/shared/assets/icons/logo';
import { Button } from '~/shared/ui/button';
import { HEADER_TEXT } from '~/shared/lib/utils/static';
import { AUTH_TYPE } from '~/shared/types/auth';
import {ThemeSwitch} from '~/routes/action.set-theme';

const Header = () => {
	return (
		<header className={'flex justify-between items-center pt-4'}>
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
							<Link to={ROUTES.SIGN_IN}>{HEADER_TEXT[AUTH_TYPE.SIGN_IN]}</Link>
						</Button>
					</li>

					<li className={'ml-2'}>
						<Button asChild>
							<Link to={ROUTES.SIGN_UP}>{HEADER_TEXT[AUTH_TYPE.SIGN_UP]}</Link>
						</Button>
					</li>

					<li className={'ml-2'}>
						<ThemeSwitch/>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export {
	Header
}
