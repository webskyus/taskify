import React, {FC} from 'react';
import {Button} from "~/shared/ui/button";
import {LuMessageSquarePlus} from "react-icons/lu";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from "~/shared/ui/dialog";
import {CREATE_DIALOG_TEXT, CREATED_PAGE_TYPE} from "~/shared/lib/utils/static";
import {Label} from "~/shared/ui/label";
import {Input} from "~/shared/ui/input";
import {Form} from "@remix-run/react";
import {Checkbox} from "~/shared/ui/checkbox";
import {gradientColors} from "~/shared/lib/utils/constants";

interface Props {
    type: `${CREATED_PAGE_TYPE}`
}

const CreateDialog: FC<Props> = ({type}) => {
    return <Dialog>
            <DialogTrigger asChild>
                <Button variant={"ghost"} size={"icon"} className={'text-6xl'}>
                    <LuMessageSquarePlus className={'stroke-green-400'}/>
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {CREATE_DIALOG_TEXT[type].title}
                    </DialogTitle>
                    <DialogDescription className={'!mb-4'}>
                        {CREATE_DIALOG_TEXT[type].description}
                    </DialogDescription>

                    <Form>
                        <div className={'mb-4'}>
                            <Input id="name" name={"name"} type={"text"} placeholder={"Workspace name"}/>
                        </div>

                        <div className={'flex mb-4 w-[450px] pr-2 pb-2 overflow-x-auto'}>
                            <Checkbox name={"color"} className={`w-10 h-10 rounded-full ${gradientColors[0]}`}/>
                            <Checkbox name={"color"} className={`w-10 h-10 ml-2 rounded-full ${gradientColors[1]}`}/>
                            <Checkbox name={"color"} className={`w-10 h-10 ml-2 rounded-full ${gradientColors[2]}`}/>
                            <Checkbox name={"color"} className={`w-10 h-10 ml-2 rounded-full ${gradientColors[3]}`}/>
                            <Checkbox name={"color"} className={`w-10 h-10 ml-2 rounded-full ${gradientColors[4]}`}/>
                            <Checkbox name={"color"} className={`w-10 h-10 ml-2 rounded-full ${gradientColors[5]}`}/>
                            <Checkbox name={"color"} className={`w-10 h-10 ml-2 rounded-full ${gradientColors[6]}`}/>
                            <Checkbox name={"color"} className={`w-10 h-10 ml-2 rounded-full ${gradientColors[7]}`}/>
                            <Checkbox name={"color"} className={`w-10 h-10 ml-2 rounded-full ${gradientColors[8]}`}/>
                            <Checkbox name={"color"} className={`w-10 h-10 ml-2 rounded-full ${gradientColors[9]}`}/>
                        </div>
                    </Form>
                </DialogHeader>
            </DialogContent>
    </Dialog>
};

export {
    CreateDialog
};
