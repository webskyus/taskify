import React, {FC} from 'react';
import {Button} from "~/shared/ui/button";
import {LuMessageSquarePlus} from "react-icons/lu";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from "~/shared/ui/dialog";
import {CREATED_PAGE_TYPE} from "~/shared/lib/utils/static";

interface Props {
    type: `${CREATED_PAGE_TYPE}`
}

const CreateDialog: FC<Props> = ({type}) => {
    return <Dialog>
            <DialogTrigger asChild>
                <Button variant={"ghost"} size={"icon"} className={'text-6xl'}>
                    <LuMessageSquarePlus className={'stroke-purple-400 dark:stroke-pink-400'}/>
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create new {type}</DialogTitle>
                    <DialogDescription>
                        You can create a workspace where you can set up projects.
                    </DialogDescription>

                    <div>
                        {/*<Label htmlFor="name" className="text-right">*/}
                        {/*    Name*/}
                        {/*</Label>*/}
                        {/*<Input id="name" value="Pedro Duarte" className="col-span-3" />*/}
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
};

export {
    CreateDialog
};
