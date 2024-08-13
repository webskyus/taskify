import { SupabaseClient } from '@supabase/supabase-js';

const signInWithGoogleOAuthApi = async (
	supabase: SupabaseClient
) => {
	await supabase.auth.signInWithOAuth({
		provider: 'google',
		options: {
			redirectTo: `https://taskify-remix-app.vercel.app/auth/callback`,
			queryParams: {
				access_type: 'offline',
				prompt: 'consent',
			},
		},
	});
};

const signInWithGithubOAuthApi = async (
	supabase: SupabaseClient
) => {
	await supabase.auth.signInWithOAuth({
		provider: 'github',
		options: {
			redirectTo: `https://taskify-remix-app.vercel.app/auth/callback`,
		},
	});
};

export { signInWithGoogleOAuthApi, signInWithGithubOAuthApi };
