import {useEffect, useState} from 'react';
import {createBrowserClient} from '@supabase/auth-helpers-remix';
import {useRevalidator} from '@remix-run/react';
import type {Session} from '@supabase/supabase-js';
import {Database} from '~/app/supabase/supabase.database';

type SupabaseEnv = {
    SUPABASE_URL: string;
    SUPABASE_ANON_KEY: string;
};

type UseSupabase = {
    env: SupabaseEnv;
    serverSession: Session | null;
};

export const useSupabase = ({env, serverSession}: UseSupabase) => {
    const [supabase] = useState(
        () => createBrowserClient<Database>(
            env.SUPABASE_URL!,
            env.SUPABASE_ANON_KEY!,
        ),
    );
    const serverAccessToken = serverSession?.access_token;
    const revalidator = useRevalidator();

    useEffect(() => {
        const {
            data: {subscription},
        } = supabase.auth.onAuthStateChange((_, session) => {
            session?.access_token !== serverAccessToken && revalidator.revalidate();
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [supabase.auth, serverAccessToken, revalidator]);

    return {
        supabase,
    };
};
