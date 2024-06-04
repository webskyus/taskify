import React from 'react';
import {json, LoaderFunctionArgs, MetaFunction, redirect} from "@remix-run/node";
import {getSupabaseWithSessionAndHeaders} from "~/app/supabase/supabase.server";
import {ROUTES} from "~/shared/lib/utils/urls";
import {Link, useLoaderData} from "@remix-run/react";
import {DashboardHeader} from "~/widgets/dashboard-header";
import {gradientColors} from "~/shared/lib/utils/constants";
import {getRandomInt} from "~/shared/lib/utils";

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

// WORKSPACES + | CHOOSE ONE
// PROJECTS + | CHOOSE ONE
// SUPABASE | add property from notebook
// SUPABASE | add projects
// SUPABASE | handle for new user create workspace

const Dashboard = () => {
    const {profile} = useLoaderData<typeof loader>();

    return <section className={"container"}>
        <DashboardHeader data={profile}/>

        <section>
            <h1 className={'mb-6 text-4xl sm:text-6xl font-bold'}>🌈 Workspaces</h1>

            <section className={"grid grid-rows-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 mb-4"}>
                {
                    [1,23,4,5,35,3,1,23,4,5,35,3,1,23,4,5,35,3,535].map((_, i) => {
                        const randomBgGradient = gradientColors[getRandomInt(0, gradientColors.length-1)];
                        const url = `${ROUTES.DASHBOARD}/${i}`;

                        return <Link key={_} to={url}>
                            <article className={`p-4 rounded ${randomBgGradient}`}>
                                <p className={'mb-2 text-6xl'}>🐑</p>
                                <h2 className={'text-2xl font-bold line-clamp-1 text-white'}>
                                    WORKSPACE #{i + 1}
                                </h2>
                                <p className={'line-clamp-2 text-white'}>
                                    Workspace Description Workspace Description Workspace Description Workspace
                                    Description
                                </p>
                            </article>
                        </Link>
                    })
                }
            </section>
        </section>
    </section>;
};

export default Dashboard
