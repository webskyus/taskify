import { SupabaseClient } from '@supabase/supabase-js';

const signInWithGoogleOAuthApi = async (supabase: SupabaseClient) => {
	await supabase.auth.signInWithOAuth({
		provider: 'google',
		options: {
			redirectTo: 'http://localhost:3000/auth/callback',
			queryParams: {
				access_type: 'offline',
				prompt: 'consent',
			},
		},
	});
};

const signInWithGithubOAuthApi = async (supabase: SupabaseClient) => {
	await supabase.auth.signInWithOAuth({
		provider: 'github',
		options: {
			redirectTo: 'http://localhost:3000/auth/callback',
		},
	});
};

export { signInWithGoogleOAuthApi, signInWithGithubOAuthApi };
