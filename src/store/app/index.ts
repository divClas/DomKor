import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {I_AppState, T_PopoverId} from "@/types/app.ts";


export const initialAppState: I_AppState = {
    popoversOpen: ""
}
export const index = createSlice({
    name: 'app',
    initialState: initialAppState,
    reducers: {
        setPopover: (state, action: PayloadAction<T_PopoverId>) => {
            state.popoversOpen = action.payload
        },
    },
})

export const {setPopover} = index.actions


export default index.reducer