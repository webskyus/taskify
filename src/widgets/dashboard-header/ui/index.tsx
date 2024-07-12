import { Avatar, AvatarFallback, AvatarImage } from '~/shared/ui/avatar';
import { getShortFullName } from '~/shared/lib/utils';
import { Link, useOutletContext, useRouteLoaderData } from '@remix-run/react';
import { ROUTES } from '~/shared/lib/utils/urls';
import LogoIcon from '~/shared/assets/icons/logo';
import { ThemeSwitch } from '~/routes/action.set-theme';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '~/shared/ui/dropdown-menu';
import { SupabaseClient } from '@supabase/supabase-js';
import { loader as dashboardLoader } from '~/routes/dashboard';
import { SerializeFrom } from '@remix-run/node';
import {HiChevronRight} from "react-icons/hi";

const DashboardHeader = () => {
	const { profile } = useRouteLoaderData('root') as SerializeFrom<
		typeof dashboardLoader
	>;
	const { avatar_url, full_name, email } = profile;
	const { supabase } = useOutletContext<{
		supabase: SupabaseClient;
	}>();

	const handleLogout = async () => {
		const { error } = await supabase.auth.signOut();

		console.log('dd.print.user.signout.error', error);
	};

	return (
		<header className={'flex justify-between items-center pt-4 mb-24'}>
			<Link unstable_viewTransition to={ROUTES.DASHBOARD} className={'w-14'}>
				<LogoIcon className={'w-36 sm:w-40'} />
			</Link>

			<nav className={'hidden md:flex items-center mr-auto'}>
				<ul className={'flex items-center'}>
					<li className={'ml-2'}>
						<DropdownMenu>
							<DropdownMenuTrigger className={'flex items-center'}>
								Workspace name #1
							</DropdownMenuTrigger>
							<DropdownMenuContent align='end'>
								<DropdownMenuItem>
									Workspace name #1
								</DropdownMenuItem>
								<DropdownMenuItem>
									Workspace name #2
								</DropdownMenuItem>
								<DropdownMenuItem>
									Workspace name #3
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</li>
					<li className={'ml-2'}>
						<HiChevronRight size={24}/>
					</li>
					<li className={'ml-2'}>
						<DropdownMenu>
							<DropdownMenuTrigger className={'flex items-center'}>
								Project name #1
							</DropdownMenuTrigger>
							<DropdownMenuContent align='end'>
								<DropdownMenuItem>
									Project name #1
								</DropdownMenuItem>
								<DropdownMenuItem>
									Project name #2
								</DropdownMenuItem>
								<DropdownMenuItem>
									Project name #3
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</li>
				</ul>
			</nav>

			<nav className={'flex items-center ml-auto'}>
				<ul className={'flex items-center'}>
					<li className={'ml-2'}>
						<DropdownMenu>
							<DropdownMenuTrigger className={'flex items-center'}>
								<h5 className={'pt-[6px] mr-2 font-semibold text-right'}>
									<p className={'leading-[12px] text-[14px]'}>{full_name}</p>
									<span className={'text-[12px] leading-[12px] font-light'}>
										{email}
									</span>
								</h5>
								<Avatar>
									<AvatarImage src={avatar_url || undefined} />
									<AvatarFallback>
										{getShortFullName(full_name || undefined)}
									</AvatarFallback>
								</Avatar>
							</DropdownMenuTrigger>
							<DropdownMenuContent align='end'>
								<DropdownMenuItem
									className={'text-red-400'}
									onClick={handleLogout}>
									Logout
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</li>
					<li className={'ml-2'}>
						<ThemeSwitch />
					</li>
				</ul>
			</nav>
		</header>
	);
};

export { DashboardHeader };
