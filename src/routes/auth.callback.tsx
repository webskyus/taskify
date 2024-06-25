import { redirect, type LoaderFunctionArgs } from '@remix-run/node';
import { ROUTES } from '~/shared/lib/utils/urls';
import { getSupabaseWithHeaders } from '~/app/supabase/supabase.server';

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const requestUrl = new URL(request.url);
	const code = requestUrl.searchParams.get('code');
	const next = requestUrl.searchParams.get('next') || ROUTES.DASHBOARD;

	if (code) {
		const { headers, supabase } = getSupabaseWithHeaders({
			request,
		});
		const { error } = await supabase.auth.exchangeCodeForSession(code);

		if (!error) {
			return redirect(next, {
				headers,
			});
		}
	}

	return redirect(ROUTES.SIGN_IN);
};
