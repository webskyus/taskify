import React, {FC, useState} from 'react';
import {gradientColors} from "~/shared/lib/utils/constants";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "~/shared/ui/dropdown-menu";
import {Button} from "~/shared/ui/button";
import {date} from "~/shared/lib/utils";
import {Database} from "~/app/supabase/supabase.database";
import {ROUTES} from "~/shared/lib/utils/urls";
import {motion, AnimatePresence} from 'framer-motion';
import { Link } from '@remix-run/react';
import {HiOutlineDotsHorizontal} from 'react-icons/hi';
import {useGetWorkspaceCrud} from "~/features/workspaces/hooks";
import {Workspace} from "~/routes/dashboard";

interface Props {
    workspace: Workspace
    index: number
}

const WorkspaceItem: FC<Props> = ({workspace, index}) => {
    const [isVisible, setIsVisible] = useState(true);
    const {id, name, color, icon, created_at, description} = workspace;
    const url = `${ROUTES.DASHBOARD}/${id}`;
    const {handleDeleteWorkspace, handleUpdateWorkspace} = useGetWorkspaceCrud({setIsVisible});

    return (
        <AnimatePresence>
            {
                isVisible
                    ? <motion.article
                        initial={{opacity: 0, y: -20 * index}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: 20 * index}}
                        transition={{duration: 0.3}}
                        className={`p-4 rounded ${gradientColors[color]}`}>
                        <header className={'flex items-start justify-between'}>
                            <Link unstable_viewTransition to={url}>
                                <p className={'mb-2 text-6xl'}>{icon}</p>
                                <h2
                                    className={'text-2xl font-bold line-clamp-1 text-white'}>
                                    {name}
                                </h2>
                            </Link>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Button
                                        variant={'link'}
                                        className={
                                            '!h-6 !p-0 hover:opacity-50 transition-opacity'
                                        }>
                                        <HiOutlineDotsHorizontal size={28}/>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={() => handleUpdateWorkspace(id)}>
                                        Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className={'text-red-400'}
                                        onClick={() => handleDeleteWorkspace(id)}>
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </header>
                        <p className={'mt-2 mb-4 line-clamp-3 text-white'}>
                            {description}
                        </p>
                        <time dateTime={'24.12.2024'} className={'text-xs italic'}>
                            Created in {date(created_at)}
                        </time>
                    </motion.article>
                    : undefined
            }
        </AnimatePresence>
    );
};

export {
    WorkspaceItem
};
