import React from 'react';
import {json, LoaderFunctionArgs, MetaFunction, redirect} from "@remix-run/node";
import {getSupabaseWithSessionAndHeaders} from "~/app/supabase/supabase.server";
import {ROUTES} from "~/shared/lib/utils/urls";
import {useLoaderData} from "@remix-run/react";
import {DashboardHeader} from "~/widgets/dashboard-header";

export const meta: MetaFunction = () => {
    return [
        {
            title: 'Taskify | Dashboard',
        },
        {
            name: 'description',
            content: 'Your all in one productivity app | Dashboard',
        },
    ];
};

export const loader = async ({request}: LoaderFunctionArgs) => {
    const {headers, serverSession, supabase} = await getSupabaseWithSessionAndHeaders({
        request
    });
    const {data} = await supabase
        .from("profiles")
        .select()
        .eq('id', serverSession?.user?.id)
        .single()

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
            serverSession,
            profile: data
        },
        {
            headers
        }
    )
}

const Dashboard = () => {
    const {profile} = useLoaderData<typeof loader>();

    return <section className={"container"}>
        <DashboardHeader data={profile}/>

        WORKSPACES + | CHOOSE ONE
        PROJECTS + | CHOOSE ONE
    </section>;
};

export default Dashboard
