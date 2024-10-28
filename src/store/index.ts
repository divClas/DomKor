import {combineReducers, configureStore} from '@reduxjs/toolkit'
import graphic from "@/store/graphic";
import graphicKP from "@/store/graphicKP";
import notification from "@/store/notification";


export const store = configureStore({
    reducer: combineReducers(
        {
            graphic,
            graphicKP,
            notification
        }
    ),
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']