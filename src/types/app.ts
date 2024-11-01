import {I_Error, T_PromiseStatus} from "@/types/api.ts";
import {RcFile} from "antd/es/upload";

export type T_Date = string
export type AllFieldsIs<T, Type> = { [K in keyof T]: Type }

export type FileBinary = File | string | Blob | RcFile

export interface I_State<I_Entity> {
    status: T_PromiseStatus
    entity: I_Entity
    errors: I_Error[]
}
export type T_FormItemType = 'string' | 'upload' | 'phone' | 'email' | 'hidden' | 'orgSelect'
export interface I_FormFiled<I_FormFields> {
    type: T_FormItemType
    name: keyof I_FormFields
    label: string
    required?: boolean
}

export type T_Background = 'accent' | 'low' | 'white' | 'transparent' | 'gray'