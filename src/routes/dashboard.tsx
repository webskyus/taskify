import React from 'react';
import {ActionFunctionArgs, json, LoaderFunctionArgs, MetaFunction, redirect} from "@remix-run/node";
import {getSupabaseWithSessionAndHeaders} from "~/app/supabase/supabase.server";
import {ROUTES} from "~/shared/lib/utils/urls";
import {Link, useLoaderData} from "@remix-run/react";
import {DashboardHeader} from "~/widgets/dashboard-header";
import {gradientColors} from "~/shared/lib/utils/constants";
import {date, getRandomInt} from "~/shared/lib/utils";
import {CreateDialog} from "~/features/create-dialog";
import {CREATED_PAGE_TYPE} from "~/shared/lib/utils/static";
import {EmptyResultMessage} from "~/shared/ui/empty-result-message";
import {Button} from "~/shared/ui/button";
import {HiOutlineDotsHorizontal} from "react-icons/hi";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "~/shared/ui/dropdown-menu";
import {validator} from "~/features/create-dialog/ui/create-dialog";
import {validationError} from "remix-validated-form";

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

export const action = async ({ request }: ActionFunctionArgs) => {
    const result = await validator.validate(
        await request.formData()
    );
    const { error} = result;

    if (error) return validationError(result.error);

    return json({
        ok: true
    })
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
        .eq('owner_id', serverSession?.user?.id)

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

    const handleDeleteWorkspace = async (id: number) => {

    }

    const handleEditWorkspace = async (id: number) => {

    }

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
                    workspaces?.map((workspace, i) => {
                        const {id, name, color, icon, created_at, description} = workspace;
                        const url = `${ROUTES.DASHBOARD}/${id}`;

                        return <article key={id} className={`p-4 rounded ${gradientColors[color]}`}>
                                <header className={'flex items-start justify-between'}>
                                    <Link to={url}>
                                        <p className={'mb-2 text-6xl'}>{icon}</p>
                                        <h2 className={'text-2xl font-bold line-clamp-1 text-white'}>
                                            {name}
                                        </h2>
                                    </Link>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <Button variant={"link"} className={'!h-6 !p-0 hover:opacity-50 transition-opacity'}>
                                                <HiOutlineDotsHorizontal size={28} />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem onClick={() => handleEditWorkspace(1)}>
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className={'text-red-400'} onClick={() => handleDeleteWorkspace(1)}>
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>

                                </header>
                                <p className={'mt-2 mb-4 line-clamp-3 text-white'}>
                                    {description}
                                </p>
                            <time dateTime={"24.12.2024"} className={'text-xs italic'}>Created in {date(created_at)} </time>
                            </article>
                    })
                }
            </section>
        </section>
    </section>;
};

export default Dashboard
