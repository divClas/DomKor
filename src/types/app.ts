import {I_Error, T_PromiseStatus} from "@/types/api.ts";
import {RcFile} from "antd/es/upload";
import {ReactElement} from "react";
import {BaseButtonProps} from "antd/es/button/button";
import {SelectProps} from "antd";

export type T_Date = string
export type AllFieldsIs<T, Type> = { [K in keyof T]: Type }

export type FileBinary = File | string | Blob | RcFile

export interface I_State<I_Entity> {
    status: T_PromiseStatus
    entity: I_Entity
    errors: I_Error[]
}

export type T_Background = 'accent' | 'low' | 'white' | 'transparent' | 'gray'
export interface I_ButtonProps {
    label: string
    background: T_Background
    icon?: ReactElement
    onClick?: () => void
    className?: string
    type?: "button" | "submit" | "reset"
    disabled?: boolean
    iconPosition?: BaseButtonProps['iconPosition']
}
export interface I_SelectProps {
    onChange: SelectProps['onChange']
    value: SelectProps['value']
    options: SelectProps['options']
    className?: string
    labelRenderPostfix?: string
}
export type T_PopoverId = string
export interface I_AppState {
    popoversOpen: T_PopoverId
}