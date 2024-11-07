import {FC, ReactNode} from "react";
import "./style.scss";
import {I_ButtonProps, T_PopoverId} from "@/types/app.ts";
import {Flex, Modal, Popover} from "antd";
import {Button} from "@/components/ui/Button";
import {useAppDispatch, useAppSelector} from "@/hooks/storeHooks.ts";
import {setPopover} from "@/store/app";
import useSizeHook from "@/hooks/useSizeHook.ts";
import {TitlePopover} from "@/components/ui/TitlePopover";
import {textFormat} from "@/helpers/textFormat.ts";

export const PopoverWidget: FC<{
    id: T_PopoverId
    btn?: I_ButtonProps
    title?: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    content: ReactNode;
    children?: ReactNode
    onOpenChange?: (visible: boolean) => void; // Add this prop
}> = (props) => {
    const id = textFormat.slugify(props.id)
    const dispatch = useAppDispatch()
    const {popoversOpen} = useAppSelector(s => s.app)
    // useEffect(() => {
    //     hideOnClickOutside(id, () => {
    //         dispatch(setPopover(''))
    //     })
    // }, [])

    const windowSize = useSizeHook()
    const TargetButton = <div
        onClick={() => {
            dispatch(setPopover(id))
        }}
        className={windowSize.width < 1000 ? 'w-100' : ''}
        id={'target-button-' + id}
    >
        {props.children}
        {props.btn && (
            <Button
                {...props.btn}
            />
        )}
    </div>
    if (windowSize.width > 1000) {
        return (
            <Popover
                content={props.content}
                id={id}
                title={<TitlePopover title={props.title} />}
                open={popoversOpen === id}
                forceRender={true}
                onOpenChange={props.onOpenChange}
                children={TargetButton}
            />
        );
    } else {
        return (
            <Flex>
                {TargetButton}
                <Modal
                    title={<span className={'fs--md fw--lg'}>{props.title}</span>}
                    open={popoversOpen === id}
                    forceRender={true}
                    width={'fit-content'}
                    onCancel={() => {
                        dispatch(setPopover(''))
                    }}
                    footer={null}
                    children={<div id={id}>{props.content}</div>}
                />
            </Flex>
        )
    }
};
