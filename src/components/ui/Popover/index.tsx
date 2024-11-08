import {FC, ReactNode, useEffect, useRef} from "react";
import "./style.scss";
import {I_ButtonProps} from "@/types/app.ts";
import {Flex, Modal, Popover} from "antd";
import {Button} from "@/components/ui/Button";
import useSizeHook from "@/hooks/useSizeHook.ts";
import {TitlePopover} from "@/components/ui/TitlePopover";
import {PopoverProvider, usePopover} from "@/contexts/popover.tsx";

export interface I_PopoverProps {
    btn?: I_ButtonProps
    title?: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    content: ReactNode;
    children?: ReactNode
    onOpenChange?: (visible: boolean) => void; // Add this prop
}

export const PopoverComponent: FC<I_PopoverProps> = (props) => {
    const {isOpen, setIsOpen} = usePopover();

    const popoverRef = useRef<HTMLDivElement>(null);
    const popoverRefTitle = useRef<HTMLDivElement>(null);
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
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setIsOpen]);
    const TargetButton = () => <div
        ref={popoverRef}

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
    const Content = () => (
        <div
            ref={popoverRef}
            children={props.content}
        />
    )
    if (windowSize.width > 1000) {
        return (
            <Popover
                content={<Content />}
                title={
                    <div
                        ref={popoverRefTitle}
                        children={<TitlePopover title={props.title} />}
                    />}
                open={isOpen}
                forceRender={true}
                onOpenChange={props.onOpenChange}
                children={<TargetButton/>}
            />
        );
    } else {
        return (
            <Flex>
                <TargetButton/>
                <Modal
                    title={<span className={'fs--md fw--lg max-width-315'}>{props.title}</span>}
                    open={isOpen}
                    forceRender={true}
                    width={'fit-content'}
                    onCancel={() => {
                        setIsOpen(false)
                    }}
                    footer={null}
                    children={<Content />}
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
