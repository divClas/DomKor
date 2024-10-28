import {FC, ReactElement} from "react";
import './style.scss'
import {Button as AnButton} from "antd";
import {T_Background} from "@/types/app.ts";

export const Button: FC<{
    label: string
    background: T_Background
    icon?: ReactElement
    onClick?: () => void
    className?: string
    type?: "button" | "submit" | "reset"
    disabled?: boolean
}> = (props) => {
    return (
        <AnButton htmlType={props.type}
                  disabled={props.disabled}
                  icon={props.icon}
                  className={`${props.className} bg--${props.background} w-100`}
                  onClick={props.onClick}
        >
            <span className="label">{props.label}</span>
        </AnButton>
    )
}