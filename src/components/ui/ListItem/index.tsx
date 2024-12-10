import './style.scss'
import {ReactNode} from "react";

export const ListItem = {
    WithLeftBorder: (props: {
        label: string
        children: ReactNode
    }) => (
        <div
            className={"row-with-border"}
        >
            <p className="title">{props.label}</p>
            <p className="sub-title"
               style={{display: "block"}}
            >
                {props.children}
            </p>
        </div>
    ),
    Full: (props: { children: ReactNode }) => (
        <div
            className={'child-w-100 w-100'}
        >
            {props.children}
        </div>
    )
}