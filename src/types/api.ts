import {AllFieldsIs, T_Date} from "@/types/app.ts";

export type T_PromiseStatus = 'pending' | 'fulfilled' | 'rejected'

export type I_Error = {
    code: number
    customData: string | number
    message: string
}


export type I_Response<T> = {
    status: "success" | "error"
    data: T
    errors: I_Error[]
}

export interface I_DateFilter {
    "FROM": T_Date,
    "TO": T_Date
}

export interface I_Sort {
    sortby?: string
    sort_type?: "DESC" | "ASC"
}

export interface I_PayloadList<FilterFilter extends object, SearchFilter extends object> extends I_Sort {
    filter?: Partial<AllFieldsIs<FilterFilter, I_DateFilter>>
    search?: Partial<AllFieldsIs<SearchFilter, string>>
    search_type?: "OR"
}

