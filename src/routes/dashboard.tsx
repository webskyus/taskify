import React from 'react';
import {json, LoaderFunctionArgs, MetaFunction, redirect} from "@remix-run/node";
import {getSupabaseWithSessionAndHeaders} from "~/app/supabase/supabase.server";
import {ROUTES} from "~/shared/lib/utils/urls";

export const meta: MetaFunction = () => {
    return [
        {
            title: 'Plan.io | Dashboard',
        },
        {
            name: 'description',
            content: 'Your all in one productivity app | Dashboard',
        },
    ];
};

export const loader = async ({request}: LoaderFunctionArgs) => {
    const {headers, serverSession} = await getSupabaseWithSessionAndHeaders({
        request
    });

    if (!serverSession) {
        return redirect(
            ROUTES.SIGN_IN,
            {
                headers
            }
        )
    }

    return json(
        {
            serverSession
        },
        {
            headers
        }
    )
}

const Dashboard = () => {
    return <>
        <code>top secret page</code>
    </>;
};

export default Dashboard;
