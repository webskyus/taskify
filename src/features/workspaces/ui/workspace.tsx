import React, {useEffect, useState} from 'react';
import {CreateDialog} from "~/features/create-dialog";
import {CREATED_PAGE_TYPE} from "~/shared/lib/utils/static";
import {EmptyResultMessage} from "~/shared/ui/empty-result-message";
import {ErrorMessage} from "~/shared/ui/error-message";
import {WorkspaceItem} from "~/features/workspaces/ui/components/workspace-item";
import {useGetWorkspaces} from "~/features/workspaces";

const Workspaces = () => {
    const {workspaces, error} = useGetWorkspaces();

    return (
        <section>
            <header className={'flex items-center justify-between mb-6'}>
                <h1 className={'text-4xl sm:text-6xl font-bold'}>Workspaces</h1>

                <CreateDialog type={CREATED_PAGE_TYPE.WORKSPACE}/>
            </header>

            {
                !workspaces?.length && !error &&
                <EmptyResultMessage/>
            }

            {
                error &&
                <ErrorMessage/>
            }

            <section
                className={`
                    grid grid-rows-4 grid-cols-1 
                    gap-1 mb-4
                    sm:grid-cols-2 
                    lg:grid-cols-4 
                `}>
                {
                    workspaces?.map((workspace, i) => {
                        const {id} = workspace;
                        return <WorkspaceItem workspace={workspace} key={id} index={i}/>
                    })
                }
            </section>
        </section>
    );
};

export {
    Workspaces
};
