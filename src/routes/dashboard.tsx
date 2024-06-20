import React from 'react';
import {json, LoaderFunctionArgs, MetaFunction, redirect} from "@remix-run/node";
import {getSupabaseWithSessionAndHeaders} from "~/app/supabase/supabase.server";
import {ROUTES} from "~/shared/lib/utils/urls";
import {Link, useLoaderData} from "@remix-run/react";
import {DashboardHeader} from "~/widgets/dashboard-header";
import {gradientColors} from "~/shared/lib/utils/constants";
import {getRandomInt} from "~/shared/lib/utils";
import {CreateDialog} from "~/features/create-dialog";
import {CREATED_PAGE_TYPE} from "~/shared/lib/utils/static";
import {EmptyResultMessage} from "~/shared/ui/empty-result-message";

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
    const {data: profile} = await supabase
        .from("profiles")
        .select()
        .eq('id', serverSession?.user?.id)
        .single()
    const {data: workspaces} = await supabase
        .from('workspaces')
        .select()
        .eq('user_id', serverSession?.user?.id)

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
            profile,
            workspaces
        },
        {
            headers
        }
    )
}

const Dashboard = () => {
    const {profile, workspaces} = useLoaderData<typeof loader>();

    return <section className={"container"}>
        <DashboardHeader data={profile}/>

        <section>
            <header className={'flex items-center justify-between mb-6'}>
                <h1 className={'text-4xl sm:text-6xl font-bold'}>
                    🌈 Workspaces
                </h1>

                <CreateDialog type={CREATED_PAGE_TYPE.WORKSPACE}/>
            </header>

            {
                !workspaces?.length &&
                <EmptyResultMessage/>
            }

            <section
                className={`
                    grid grid-rows-4 grid-cols-1 
                    gap-1 mb-4
                    sm:grid-cols-2 
                    md:grid-cols-3 
                    lg:grid-cols-4 
                    xl:grid-cols-5 
                `}>
                {
                    workspaces?.map((_, i) => {
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
