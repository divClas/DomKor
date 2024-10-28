import {AllFieldsIs, T_Date} from "@/types/app.ts";
import {RcFile} from "antd/es/upload"

export type T_PromiseStatus = 'pending' | 'fulfilled' | 'rejected'

export type I_Error = string


export type I_Response<T> = {
    status: "success" | "error"
    data: T
    errors: I_Error[]
}

export interface I_Payload<Entity> {
    sortby?: "SORT"
    sort_type?: "DESC" | "ASC"
    filter?: Partial<AllFieldsIs<Entity, {
        "FROM": T_Date,
        "TO": T_Date
    }>>
    search?: Partial<Entity>
}
export type T_PayloadFile = File | string | Blob | RcFile