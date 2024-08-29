import { SupabaseClient } from '@supabase/supabase-js';

type GetUserProfileApiProps = {
	supabase: SupabaseClient;
	userId: string | undefined;
};

const getUserProfileApi = async ({
	supabase,
	userId,
}: GetUserProfileApiProps) => {

	const { data, error } = await supabase
        .from('profiles')
		.select()
		.eq('id', userId)
		.single();

	return {
		data,
		error,
	};
};

export { getUserProfileApi };
