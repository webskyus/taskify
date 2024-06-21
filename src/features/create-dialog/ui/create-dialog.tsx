import React, {FC, useEffect, useState} from 'react';
import {Button} from "~/shared/ui/button";
import {LuMessageSquarePlus} from "react-icons/lu";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "~/shared/ui/dialog";
import {CREATE_DIALOG_TEXT, CREATED_PAGE_TYPE} from "~/shared/lib/utils/static";
import {Label} from "~/shared/ui/label";
import {Input} from "~/shared/ui/input";
import {Form, useNavigation} from "@remix-run/react";
import {gradientColors} from "~/shared/lib/utils/constants";
import EmojiPicker, {Theme} from "emoji-picker-react";
import {useTheme} from "~/routes/action.set-theme";
import {RadioGroup, RadioGroupItem} from "~/shared/ui/radio-group";
import {ActionFunctionArgs} from "@remix-run/node";
import {z} from "zod";

interface Props {
    type: `${CREATED_PAGE_TYPE}`
}

const schema = z.object({
    name: z
        .string()
        .min(
            5,
            "Minimum 5 characters required"
        ),
});

export const action = async ({request}: ActionFunctionArgs) => {
    const formData = await request.formData();

    console.log('dd.form.formData', formData)
}

const CreateDialog: FC<Props> = ({type}) => {
    const theme = useTheme();
    const navigation = useNavigation();
    const [emoji, setEmoji] = useState('🌈');

    return <Dialog>
        <DialogTrigger asChild onClick={() => setEmoji('🌈')}>
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

                <Form method="post">
                    <div className={'mb-6'}>
                        <Label htmlFor={"name"} className={'block mb-3'}>
                            Name
                        </Label>
                        <div className={'flex items-center'}>
                            <Input id="card-emoji"
                                   name={"emoji"}
                                   readOnly={true}
                                   disabled
                                   className={'w-10 p-0 mr-2 text-2xl border-0'}
                                   value={emoji}
                            />

                            <Input id="name"
                                   name={"name"}
                                   type={"text"}
                                   placeholder={`${type} name`}
                                   required
                            />
                        </div>

                    </div>

                    <div className={'mb-6'}>
                        <Label htmlFor={"card-emoji"} className={'block mb-2'}>Emoji</Label>
                        <EmojiPicker width={"100%"}
                                     lazyLoadEmojis={true}
                                     reactionsDefaultOpen={true}
                                     onEmojiClick={({emoji}) => setEmoji(emoji)}
                                     theme={theme as Theme}/>
                    </div>

                    <div className={'mb-6'}>
                        <Label htmlFor={"card-color"} className={'block mb-2'}>Color</Label>
                        <RadioGroup defaultValue="color_1" className={'flex w-[450px] pr-2 pb-2 overflow-x-auto'}>
                            <RadioGroupItem value="color_1" id="r1"
                                            className={`min-w-10 min-h-10 rounded-full ${gradientColors[0]}`}/>
                            <RadioGroupItem value="color_2" id="r2"
                                            className={`min-w-10 min-h-10 ml-2 rounded-full ${gradientColors[1]}`}/>
                            <RadioGroupItem value="color_3" id="r3"
                                            className={`min-w-10 min-h-10 ml-2 rounded-full ${gradientColors[2]}`}/>
                            <RadioGroupItem value="color_4" id="r4"
                                            className={`min-w-10 min-h-10 ml-2 rounded-full ${gradientColors[3]}`}/>
                            <RadioGroupItem value="color_5" id="r5"
                                            className={`min-w-10 min-h-10 ml-2 rounded-full ${gradientColors[4]}`}/>
                            <RadioGroupItem value="color_6" id="r6"
                                            className={`min-w-10 min-h-10 ml-2 rounded-full ${gradientColors[5]}`}/>
                            <RadioGroupItem value="color_7" id="r7"
                                            className={`min-w-10 min-h-10 ml-2 rounded-full ${gradientColors[6]}`}/>
                            <RadioGroupItem value="color_8" id="r8"
                                            className={`min-w-10 min-h-10 ml-2 rounded-full ${gradientColors[7]}`}/>
                            <RadioGroupItem value="color_9" id="r9"
                                            className={`min-w-10 min-h-10 ml-2 rounded-full ${gradientColors[8]}`}/>
                            <RadioGroupItem value="color_10" id="r10"
                                            className={`min-w-10 min-h-10 ml-2 rounded-full ${gradientColors[9]}`}/>
                        </RadioGroup>
                    </div>
                </Form>
            </DialogHeader>
            <DialogFooter>
                <DialogClose asChild>
                    <Button type={"button"} variant={"link"}>Close</Button>
                </DialogClose>
                <Button variant={"secondary"}
                        disabled={navigation.state === 'submitting'}>Create</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
};

export {
    CreateDialog
};
