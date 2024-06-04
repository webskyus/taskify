import React, { FC } from 'react';
import {Avatar, AvatarFallback, AvatarImage} from "~/shared/ui/avatar";
import {getShortFullName} from "~/shared/lib/utils";
import {Link} from "@remix-run/react";
import {ROUTES} from "~/shared/lib/utils/urls";
import LogoIcon from "~/shared/assets/icons/logo";

interface Props {
	data: {
		avatar_url: string
		full_name: string
		email: string
	}
}

const DashboardHeader: FC<Props> = ({data}) => {
	const {avatar_url, full_name, email} = data;

	return (
		<header className={'flex justify-between items-center pt-4 mb-24'}>
			<Link to={ROUTES.DASHBOARD}>
				<LogoIcon className={'w-24 sm:w-40'} />
			</Link>

			<nav className={'flex items-center ml-auto'}>
				<h5 className={'pt-[6px] mr-2 font-semibold text-right'}>
					<p className={"leading-[12px] text-[14px]"}>{full_name}</p>
					<span className={"text-[12px] leading-[12px] font-light"}>{email}</span>
				</h5>
				<Avatar>
					<AvatarImage src={avatar_url} />
					<AvatarFallback>{getShortFullName(full_name)}</AvatarFallback>
				</Avatar>
			</nav>
		</header>
	);
};

export {
	DashboardHeader
}
