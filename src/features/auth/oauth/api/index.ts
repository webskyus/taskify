import { SupabaseClient } from '@supabase/supabase-js';

const signInWithGoogleOAuthApi = async (
	supabase: SupabaseClient,
	url?: string
) => {
	console.log('dd.redirect.url', url)
	await supabase.auth.signInWithOAuth({
		provider: 'google',
		options: {
			redirectTo: `${url}/auth/callback`,
			queryParams: {
				access_type: 'offline',
				prompt: 'consent',
			},
		},
	});
};

const signInWithGithubOAuthApi = async (
	supabase: SupabaseClient,
	url?: string
) => {
	console.log('dd.redirect.url', url)
	await supabase.auth.signInWithOAuth({
		provider: 'github',
		options: {
			redirectTo: `${url}/auth/callback`,
		},
	});
};

export { signInWithGoogleOAuthApi, signInWithGithubOAuthApi };
