import { redirect } from '@remix-run/node';
import type { SupabaseClient } from '@supabase/supabase-js';
import {ROUTES} from "~/shared/lib/utils/urls";

 export const requireSession = async (client: SupabaseClient) => {
    const {
        data: {
            session
        },
        error
    } = await client.auth.getSession();
    console.log('dd.require.session', session, error);
    if (!session || error) {
        throw redirect(ROUTES.SIGN_IN);
    }

    return {
        session,
        error
    };
};
