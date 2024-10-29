import {FC, ReactElement, ReactNode} from "react";
import './style.scss'
import {T_Background} from "@/types/app.ts";
import {Button, Popover} from "antd";

export const PopoverWidget: FC<{
    label: string
    title: string
    background: T_Background
    icon?: ReactElement
    onClick?: () => void
    className?: string
    type?: "button" | "submit" | "reset"
    disabled?: boolean
    children: ReactNode
}> = (props) => {
    return (

        <Popover
            content={props.children}
            title={props.title}
            trigger={"click"}
            forceRender={true}
        >
            <Button
                children={props.label}
                icon={props.icon}
                className={props.className}
                disabled={props.disabled}
            />
        </Popover>
    )
}