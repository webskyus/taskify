import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '~/shared/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '~/shared/ui/avatar';
import { getShortFullName } from '~/shared/lib/utils';
import { ThemeSwitch } from '~/routes/action.set-theme';
import { useOutletContext, useRouteLoaderData } from '@remix-run/react';
import { SerializeFrom } from '@remix-run/node';
import { loader as rootLoader } from '~/root';
import { SupabaseClient } from '@supabase/supabase-js';

const ProfilePanel = () => {
	const { profile } = useRouteLoaderData('root') as SerializeFrom<
		typeof rootLoader
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
	);
};

export { ProfilePanel };
