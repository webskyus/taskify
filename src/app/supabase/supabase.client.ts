import invariant from 'tiny-invariant';
import { createBrowserClient } from '@supabase/auth-helpers-remix';
import { Database } from '~/app/supabase/supabase.database';

export const getSupabaseBrowserClient = () => {
	const env = process.env;

	invariant(
		env.SUPABASE_URL,
		`SUPABASE_URL environment variable was not provided`
	);
	invariant(
		env.SUPABASE_ANON_KEY,
		`SUPABASE_ANON_KEY environment variable was not provided`
	);

	return createBrowserClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
};
