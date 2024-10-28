import {I_Error, T_PromiseStatus} from "@/types/api.ts";

export type T_Date = string
export type AllFieldsNever<T> = { [K in keyof T]: string | number[] | number | string[] }
export type AllFieldsIs<T, Type> = { [K in keyof T]: Type }

export interface I_State<I_Entity> {
    status: T_PromiseStatus
    entity: I_Entity
    errors: I_Error[]
}
export type T_Background = 'accent' | 'low' | 'white' | 'transparent'