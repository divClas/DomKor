import {FC} from "react";
import './style.scss'
import {Button as AnButton} from "antd";
import {I_ButtonProps} from "@/types/app.ts";


export const Button: FC<I_ButtonProps> = (props) => {
    return (
        <AnButton htmlType={props.type}
                  disabled={props.disabled}
                  icon={props.icon}
                  iconPosition={props.iconPosition}
                  className={`${props.className} bg--${props.background}`}
                  onClick={props.onClick}
        >
            {!!props.label && <span className="label">{props.label}</span>}
        </AnButton>
    )
}