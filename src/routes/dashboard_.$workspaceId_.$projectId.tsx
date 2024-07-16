import {
    json,
    LoaderFunctionArgs,
    MetaFunction,
    redirect, SerializeFrom,
} from '@remix-run/node';
import {getSupabaseWithSessionAndHeaders} from '~/app/supabase/supabase.server';
import {ROUTES} from '~/shared/lib/utils/urls';
import {useLoaderData, useParams, useRouteLoaderData} from '@remix-run/react';
import {DashboardHeader} from '~/widgets/dashboard-header';
import {getWorkspacesApi} from "~/features/workspaces";
import {loader as dashboardLoader, Project, Workspace} from "~/routes/dashboard";
import {getProjectsApi} from "~/features/projects";
import postgres from "postgres";
import {CREATED_PAGE_TYPE, PROJECT_TEXT} from "~/shared/lib/utils/static";
import {CreateDialog} from "~/features/create-dialog";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "~/shared/ui/dropdown-menu";
import {Button} from "~/shared/ui/button";
import {HiOutlineDotsHorizontal} from "react-icons/hi";

export const meta: MetaFunction = () => {
    return [
        {
            title: 'Taskify | Projects',
        },
        {
            name: 'description',
            content: 'Your all in one productivity app | Projects',
        },
    ];
};

export const loader = async ({request, params}: LoaderFunctionArgs) => {
    const {headers, serverSession, supabase} =
        await getSupabaseWithSessionAndHeaders({
            request,
        });
    const {workspaceId} = params;
    const userId = serverSession?.user?.id;

    const {data: workspaces} = await getWorkspacesApi({
        supabase,
        userId,
    });

    const {data: projects} = await getProjectsApi({
        supabase,
        workspaceId,
    });

    if (!serverSession) {
        return redirect(ROUTES.SIGN_IN, {
            headers,
        });
    }

    return json(
        {
            serverSession,
            workspaces: workspaces as Workspace[],
            projects: projects as Project[],
        },
        {
            headers,
        }
    );
};

const ProjectRoute = () => {
    const {workspaces, projects} = useLoaderData<typeof loader>();
    const {projectId, workspaceId} = useParams();
    const currentProject = projects.find((project) => project.id === projectId);

    return (
        <section className={'pl-2 pr-2'}>
            <DashboardHeader workspaces={workspaces} projects={projects}/>

            {/*TODO Create ProjectColumns component*/}
            <header className={'flex items-center justify-between mb-6'}>
                <header>
                    <h1 className={'mb-1 text-4xl sm:text-6xl font-bold'}>
                        {currentProject?.name}
                    </h1>
                    <p className={'text-md'}>{currentProject?.description}</p>
                </header>

                <CreateDialog
                    type={CREATED_PAGE_TYPE.PROJECT_COLUMN}
                    handleSetId={() => 1}
                    formAction={`${ROUTES.DASHBOARD}/${workspaceId}/${projectId}`}
                />

                {/*TODO ADD FILTERS*/}
            </header>


            <section className={'flex w-full items-start min-h-[240px] overflow-x-auto'}>
                {
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((column) => {
                        return <article key={column}
                                        className={'min-w-[400px] min-h-[200px] h-auto p-4 mr-4 rounded-sm bg-pink-400'}>
                            <header className={'flex items-start justify-between'}>
                                <header>
                                    <p>Column name</p>
                                    <p>Column description</p>
                                </header>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Button
                                            variant={'link'}
                                            className={'!h-6 !p-0 hover:opacity-50 transition-opacity'}>
                                            <HiOutlineDotsHorizontal size={28}/>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem>
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className={'text-red-400'}>
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </header>
                        </article>
                    })
                }
            </section>
        </section>
    );
};

export default ProjectRoute;
