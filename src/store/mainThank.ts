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
import {I_Error, I_Response} from "@/types/api.ts";
import {AxiosRequestConfig} from "axios";
import {Dictionary} from "@/contexts/Dictionary.ts";
import {I_State} from "@/types/app.ts";
import {A_GET_LIST, A_SEND_EVENT} from "@/store/constants.ts";

export type I_MainThank<T, Payload> = AsyncThunk<
    I_Response<T>,
    Payload,
    {
        state?: unknown;
        dispatch?: ThunkDispatch<unknown, unknown, UnknownAction> | undefined;
        rejectValue: I_Response<T>;
        serializedErrorType?: unknown;
        pendingMeta?: unknown;
    }>

export function mainThank<T, Payload>(config: {
    endpoint: string,
    method: AxiosRequestConfig['method'],
}): I_MainThank<T, Payload> {
    const {endpoint, method} = config
    return createAsyncThunk<
        I_Response<T>,
        Payload, {
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
            errors: [{
                message: "Ошибка сервера!",
                code: 0,
                customData: ''
            }] as I_Error[]
        }
    }
}

export interface I_ThankManager<I_Entity, GetListPayload extends object, SendEventPayload extends object> {
    getList: I_MainThank<I_Entity[], GetListPayload>;
    sendEvent: I_MainThank<I_Entity[], SendEventPayload >;
}

export interface I_TankManagerProps {
    URL: string
    NAME: string
}

export function ThankManager<I_Entity, GetListPayload extends object, SendEventPayload extends object>(config: I_TankManagerProps): I_ThankManager<I_Entity, GetListPayload, SendEventPayload> {
    const {URL} = config;
    return {
        getList: mainThank<I_Entity[], GetListPayload>({
            endpoint: `${URL}${A_GET_LIST}`,
            method: "POST",
        }),
        sendEvent: mainThank<I_Entity[], SendEventPayload>({
            endpoint: `${URL}${A_SEND_EVENT}`,
            method: "POST",
        }),
    }
}

export function createReducer<I_Entity extends {
    ID: number | string
}, GetListPayload extends object, SendEventPayload extends object>(config: I_TankManagerProps): {
    thank: I_ThankManager<I_Entity, GetListPayload, SendEventPayload>,
    slice: Slice<I_State<I_Entity[]>, SliceCaseReducers<I_State<I_Entity[]>>, string, string, SliceSelectors<I_State<I_Entity[]>>>
} {
    const thank = ThankManager<I_Entity, GetListPayload, SendEventPayload>(config)
    const slice = createListSlice<I_Entity, GetListPayload, SendEventPayload>({
        NAME: config.NAME,
        THANK: thank
    })
    return {thank, slice}
}

export function createListSlice<I_Entity extends {
    ID: number | string
}, GetListPayload extends object, SendEventPayload extends object>(config: {
    THANK: I_ThankManager<I_Entity, GetListPayload, SendEventPayload>,
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

            builder.addMatcher<ReturnType<I_MainThank<object, object>["pending"]>>(
                (action) => action.type.startsWith(`/${Dictionary.GRAPHIC.en}`) && action.type.endsWith("/pending"),
                (state) => {
                    state.status = 'pending'
                }
            )

            builder.addMatcher<ReturnType<I_MainThank<object, object>["fulfilled"]>>(
                (action) => action.type.startsWith(`/${Dictionary.GRAPHIC.en}`) && action.type.endsWith("/fulfilled"),
                (state) => {
                    state.status = 'fulfilled'
                }
            )
            builder.addMatcher<ReturnType<I_MainThank<object, object>["rejected"]>>(
                (action) => action.type.startsWith(`/${Dictionary.GRAPHIC.en}`) && action.type.endsWith("/rejected"),
                (state, action) => {
                    state.errors = action.payload?.errors ?? []
                    state.status = 'rejected'
                }
            )
        },
    })
}
