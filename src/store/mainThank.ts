import {
    AsyncThunk,
    createAsyncThunk,
    createSlice,
    Draft,
    Slice,
    SliceCaseReducers, SliceSelectors,
    ThunkDispatch,
    UnknownAction
} from "@reduxjs/toolkit";
import instance from "@/store/instance.ts";
import {I_Error, I_Payload, I_Response} from "@/types/api.ts";
import {AxiosRequestConfig} from "axios";
import {Dictionary} from "@/contexts/Dictionary.ts";
import {I_State} from "@/types/app.ts";
import {A_GET_LIST} from "@/store/constants.ts";

export type I_MainThank<T, T_Data = object> = AsyncThunk<
    I_Response<T>,
    I_Payload<T_Data>,
    {
        state?: unknown;
        dispatch?: ThunkDispatch<unknown, unknown, UnknownAction> | undefined;
        rejectValue: I_Response<T>;
        serializedErrorType?: unknown;
        pendingMeta?: unknown;
    }>

export function mainThank<T, T_Data = object>(config: {
    endpoint: string,
    method: AxiosRequestConfig['method'],
}): I_MainThank<T, T_Data> {
    const {endpoint, method} = config
    return createAsyncThunk<I_Response<T>, I_Payload<T_Data>, {
        state?: unknown;
        rejectValue: I_Response<T>;
        serializedErrorType?: unknown;
        pendingMeta?: unknown;
    }>(
        endpoint,
        async (data, {rejectWithValue}) => {
            try {
                const res = await fetchData<T>(endpoint, {
                    method,
                    data
                });
                if (res.status === "error") {
                    return rejectWithValue(res as I_Response<T>);
                }

                return res as I_Response<T>;
            } catch (error: unknown) {
                return rejectWithValue(error as I_Response<T>);
            }
        }
    );
}


export async function fetchData<T>(endpoint: string, options: AxiosRequestConfig): Promise<I_Response<T>> {
    try {
        return (await instance()<I_Response<T>>(endpoint, options)).data
    } catch (error: string[] | unknown) {
        return {
            status: "error",
            data: null as T,
            errors: ["Ошибка сервера!"] as I_Error[]
        }
    }
}
export interface I_ThankManager<I_Entity> {
    getList: I_MainThank<I_Entity[], I_Payload<I_Entity>>;
}

export interface I_TankManagerProps {
    URL: string
    NAME: string
}

export function ThankManager<I_Entity>(config: I_TankManagerProps): I_ThankManager<I_Entity> {
    const { URL } = config;
    return {
        getList: mainThank<I_Entity[], I_Payload<I_Entity>>({
            endpoint: `${URL}${A_GET_LIST}`,
            method: "POST",
        }),
    }
}

export function createReducer<I_Entity extends { ID: number | string }>(config: I_TankManagerProps): {
    thank: I_ThankManager<I_Entity>,
    slice: Slice<I_State<I_Entity[]>, SliceCaseReducers<I_State<I_Entity[]>>, string, string, SliceSelectors<I_State<I_Entity[]>>>
} {
    const thank = ThankManager<I_Entity>(config)
    const slice = createListSlice({
        NAME: config.NAME,
        THANK: thank
    })
    return { thank, slice }
}
export function createListSlice<I_Entity extends { ID: number | string }>(config: {
    THANK: I_ThankManager<I_Entity>,
    NAME: string
    LIST_PAGE?: string
}) {
    return createSlice({
        name: config.NAME,
        initialState: {
            entity: [],
            errors: [],
            status: "fulfilled"
        } as I_State<I_Entity[]>,
        reducers: {},
        extraReducers: (builder) => {
            builder.addCase(config.THANK.getList.fulfilled, (state, action) => {
                state.entity = action.payload.data as Draft<I_Entity>[]
            })

            builder.addMatcher<ReturnType<I_MainThank<unknown, unknown>["pending"]>>(
                (action) => action.type.startsWith(`/${Dictionary.GRAPHIC.en}`) && action.type.endsWith("/pending"),
                (state) => {
                    state.status = 'pending'
                }
            )

            builder.addMatcher<ReturnType<I_MainThank<unknown, unknown>["fulfilled"]>>(
                (action) => action.type.startsWith(`/${Dictionary.GRAPHIC.en}`) && action.type.endsWith("/fulfilled"),
                (state) => {
                    state.status = 'fulfilled'
                }
            )
            builder.addMatcher<ReturnType<I_MainThank<unknown, unknown>["rejected"]>>(
                (action) => action.type.startsWith(`/${Dictionary.GRAPHIC.en}`) && action.type.endsWith("/rejected"),
                (state, action) => {
                    state.errors = action.payload?.errors ?? []
                    state.status = 'rejected'
                }
            )
        },
    })
}
