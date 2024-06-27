import {useOutletContext, useRouteLoaderData} from "@remix-run/react";
import {getObjectKeysLength} from "~/shared/lib/utils";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {loader as dashboardLoader, Workspace} from "~/routes/dashboard";
import {SerializeFrom} from "@remix-run/node";
import {deleteWorkspaceApi, updateWorkspaceApi, workspaceChannelApi} from "~/features/workspaces/api";
import {RealtimePostgresChangesPayload, SupabaseClient} from "@supabase/supabase-js";

export type RealtimePostgresChangesPayloadType = RealtimePostgresChangesPayload<{[p: string]: any }>;

interface useGetWorkspaceCrudProps {
    setIsVisible: Dispatch<SetStateAction<boolean>>
}

const useGetWorkspaceCrud = ({setIsVisible}: useGetWorkspaceCrudProps) => {
    const {supabase} = useOutletContext<{
        supabase: SupabaseClient;
    }>();

    const handleUpdateWorkspace = async (id: string) => updateWorkspaceApi({supabase, id})

    const handleDeleteWorkspace = async (id: string) => deleteWorkspaceApi({supabase, id, setIsVisible});

    return {
        handleUpdateWorkspace,
        handleDeleteWorkspace
    }
}

const useGetWorkspaces = () => {
    const {supabase} = useOutletContext<{
        supabase: SupabaseClient;
    }>();
    const {
        workspaces: serverWorkspaces,
        error
    } = useRouteLoaderData('routes/dashboard') as SerializeFrom<typeof dashboardLoader>;
    const [workspaces, setWorkspaces] = useState<Workspace[]>(serverWorkspaces);

    useEffect(() => {
        setWorkspaces(serverWorkspaces);
    }, [serverWorkspaces]);

    useEffect(() => {
        workspaceChannelApi({supabase, handleUpdateWorkspacesList});
    }, [supabase, workspaces, setWorkspaces]);

    const handleUpdateWorkspacesList = (payload: RealtimePostgresChangesPayloadType) => {
        if (!workspaces) return;

        const newWorkspace = payload.new as Workspace;
        const oldWorkspace = payload.old as Workspace;

        const newWorkspaceIndex = workspaces.find(
            workspace => workspace.id === newWorkspace.id
        );
        const oldWorkspaceIndex = workspaces.findIndex(
            workspace => workspace.id === oldWorkspace.id
        );

        getObjectKeysLength(newWorkspace) &&
        !newWorkspaceIndex &&
        setWorkspaces([...workspaces, newWorkspace]);

        getObjectKeysLength(oldWorkspace) &&
        oldWorkspaceIndex !== -1 &&
        setWorkspaces([
            ...workspaces.slice(0, oldWorkspaceIndex),
            ...workspaces.slice(oldWorkspaceIndex + 1, workspaces.length),
        ]);
    }

    return {
        workspaces,
        error
    }
};

export {
    useGetWorkspaceCrud,
    useGetWorkspaces
}
