import {createSlice} from "@reduxjs/toolkit";
import {I_AppState} from "@/types/app.ts";


export const initialAppState: I_AppState = {
}
export const index = createSlice({
    name: 'app',
    initialState: initialAppState,
    reducers: {
    },
})

export const {} = index.actions


export default index.reducer