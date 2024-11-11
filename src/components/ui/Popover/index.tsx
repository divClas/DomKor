import {FC, ReactNode, useEffect, useRef} from "react";
import "./style.scss";
import {I_ButtonProps} from "@/types/app.ts";
import {Flex, Modal, Popover} from "antd";
import {Button} from "@/components/ui/Button";
import useSizeHook from "@/hooks/useSizeHook.ts";
import {TitlePopover} from "@/components/ui/TitlePopover";
import {PopoverProvider, usePopover} from "@/components/ui/Popover/model/popover.tsx";

export interface I_PopoverProps {
    btn?: I_ButtonProps
    title?: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    content: ReactNode;
    children?: ReactNode
}

export const PopoverComponent: FC<I_PopoverProps> = (props) => {
    const {isOpen, setIsOpen} = usePopover();

    const popoverRef = useRef<HTMLDivElement>(null);
    const popoverRefTitle = useRef<HTMLDivElement>(null);
    const popoverRefTrigger = useRef<HTMLDivElement>(null);
    const windowSize = useSizeHook();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popoverRef.current
                &&
                !popoverRef.current.contains(event.target as Node)
                &&
                popoverRefTitle.current
                &&
                !popoverRefTitle.current.contains(event.target as Node)
                &&
                popoverRefTrigger.current
                &&
                !popoverRefTrigger.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setIsOpen]);

    if (windowSize.width > 1000) {
        return (
            <Popover
                content={<div
                    ref={popoverRef}
                    children={props.content}
                />}
                title={
                    <div
                        ref={popoverRefTitle}
                        children={<TitlePopover title={props.title} />}
                    />} 
                open={isOpen}
                align={{ offset: [0, 0] }}
                forceRender={true}
                trigger="click"
                children={<div
                    ref={popoverRefTrigger}
                    onClick={() => {
                        setIsOpen(!isOpen)
                    }}
                    className={windowSize.width < 1000 ? 'w-100' : ''}
                >
                    {props.children}
                    {props.btn && (
                        <Button
                            {...props.btn}
                            background={
                                isOpen ? "active" : `${props.btn.background}`
                            }
                        />
                    )}
                </div>}
            />
        );
    } else {
        return (
            <Flex>
                <div
                    ref={popoverRefTrigger}
                    onClick={() => {
                        setIsOpen(!isOpen)
                    }}
                    className={windowSize.width < 1000 ? 'w-100' : ''}
                >
                    {props.children}
                    {props.btn && (
                        <Button
                            {...props.btn}
                            background={
                                isOpen ? "active" : `${props.btn.background}`
                            }
                        />
                    )}
                </div>
                <Modal
                    title={<span className={'fs--md fw--lg max-width-315'}>{props.title}</span>}
                    open={isOpen}
                    forceRender={true}
                    width={'fit-content'}
                    onCancel={() => {
                        setIsOpen(false)
                    }}
                    footer={null}
                    children={<div
                        ref={popoverRef}
                        children={props.content}
                    />}
                />
            </Flex>
        )
    }
};
export const PopoverWidget: FC<I_PopoverProps> = (props) => {

    return (
        <PopoverProvider>
            <PopoverComponent {...props} />
        </PopoverProvider>
    );
}
