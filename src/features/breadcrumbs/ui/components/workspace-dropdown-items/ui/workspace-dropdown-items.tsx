import React, {FC} from "react";
import {Link, useParams} from "@remix-run/react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "~/shared/ui/dropdown-menu";
import {ROUTES} from "~/shared/lib/utils/urls";
import {Project, Workspace} from "~/routes/dashboard";

interface Props {
    workspaces?: Workspace[]
}

const WorkspaceDropdownItems: FC<Props> = ({workspaces}) => {
    const {workspaceId} = useParams();
    const currentWorkspaceName = workspaces?.find(({id}) => id === workspaceId);

    return <DropdownMenu>
        <DropdownMenuTrigger className={'flex items-center leading-[12px] text-[14px] font-medium'}>
            {currentWorkspaceName?.name}
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
            {
                workspaces?.map((workspace) => {
                    const {name, id} = workspace;

                    return <DropdownMenuItem key={id}>
                        <Link unstable_viewTransition to={`${ROUTES.DASHBOARD}/${id}`}>
                            {name}
                        </Link>
                    </DropdownMenuItem>
                })
            }
        </DropdownMenuContent>
    </DropdownMenu>
}

export {
    WorkspaceDropdownItems
}
