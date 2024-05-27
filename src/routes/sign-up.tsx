import React from 'react';
import {json, LoaderFunctionArgs, MetaFunction, redirect} from '@remix-run/node';
import { AuthHeader } from '~/widgets/auth-header';
import { Auth } from '~/widgets/auth';
import { AUTH_TYPE } from '~/shared/types/auth';
import {getSupabaseWithSessionAndHeaders} from "~/app/supabase/supabase.server";
import {ROUTES} from "~/shared/lib/utils/urls";

export const meta: MetaFunction = () => {
	return [
		{
			title: 'Taskify | Sign-up',
		},
		{
			name: 'description',
			content: 'Your all in one agile board web app | Sign-up',
		},
	];
};

export const loader = async ({request}: LoaderFunctionArgs) => {
	const {headers, serverSession} = await getSupabaseWithSessionAndHeaders({
		request
	});

	if (serverSession) {
		return redirect(
			ROUTES.DASHBOARD,
			{
				headers
			}
		)
	}

	return json(
		{
			success: true
		},
		{
			headers
		}
	)
};


const SignUp = () => {
	return (
		<section className={'container'}>
			<AuthHeader authType={AUTH_TYPE.SIGN_UP} />
			<Auth authType={AUTH_TYPE.SIGN_UP} />
		</section>
	);
};

export default SignUp;
