import {AsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {I_MainThank} from "../mainThank";
import {A_CREATE, A_DELETE, A_GET_LIST, A_GET_ONE, A_LOGIN, A_UPDATE} from "@/store/constants.ts";

export type I_MessageType = 'success' | 'error' | 'info' | 'warning' | 'loading'

export interface I_Message {
  id: string,
  title: string,
  message: string,
  type: I_MessageType
}

export interface I_NotificationState {
  messages: I_Message[]
}

export const initialNotificationState: I_NotificationState = {
  messages: []
}
export const index = createSlice({
  name: 'notification',
  initialState: initialNotificationState,
  reducers: {
    setNotification: (state, action: PayloadAction<I_Message>) => {
      const messages = [...state.messages].filter(e => e.id !== action.payload.id)
      state.messages = [...messages, action.payload]
    },
    setNotificationList: (state, action: PayloadAction<{
      title: I_Message['title'],
      type: I_Message['type'],
      messages: I_Message['message'][],
    }>) => {
      const messages = [...state.messages].filter(e => action.payload.messages.find(m => m === e.id))


      state.messages = [...state.messages, ...messages.map(m => ({
        id: m.id,
        title: action.payload.title,
        message: m.message,
        type: action.payload.type
      }))]
    },
    unsetNotification: (state, action: PayloadAction<{
      id: I_Message['id']
    }>) => {
      state.messages = state.messages.filter(e => e.id !== action.payload.id)
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher<ReturnType<AsyncThunk<unknown, unknown, object>["pending"]>>(
      (action) => action.type.endsWith("/pending"),
      (state, action) => {
        state.messages = [...state.messages, {
          type: 'loading',
          message: '',
          id: action.meta.requestId,
          title: action.type.split('/')[1] + ': загрузка'
        }]
      }
    );
    builder.addMatcher<ReturnType<I_MainThank<unknown, unknown>["fulfilled"]>>(
      (action) => action.type.endsWith("/fulfilled"),
      (state, action) => {
        const messageIndex = [...state.messages].findIndex(e => e.id === action.meta.requestId)
        const messages: I_Message[] = [...state.messages]
        if (messageIndex === -1) return
        let actionMessage: string = ''
        if (action.type.includes(A_UPDATE)) {
          actionMessage = 'обновлён'
        }

        if (action.type.includes(A_GET_LIST)) {
          actionMessage = 'получены'
        }

        if (action.type.includes(A_LOGIN)) {
          actionMessage = 'авторизован'
        }

        if (action.type.includes(A_CREATE)) {
          actionMessage = 'создан'
        }

        if (action.type.includes(A_DELETE)) {
          actionMessage = 'удалён'
        }

        if (action.type.includes(A_GET_ONE)) {
          actionMessage = 'получен'
        }
        messages[messageIndex] = {
          type: 'success',
          message: '',
          id: action.meta.requestId,
          title: action.type.split('/')[1] + ': ' + actionMessage
        }
        state.messages = messages
      }
    );
    builder.addMatcher<ReturnType<I_MainThank<unknown, unknown>["rejected"]>>(
      (action) => action.type.endsWith("/rejected"),
      (state, action) => {
        const messageIndex = [...state.messages].findIndex(e => e.id === action.meta.requestId)
        const title = 'Ошибка'
        if (!title || messageIndex === -1) return
        const errors: I_Message[] = (action.payload?.errors ?? []).map((e, index) => ({
          id: action.meta.requestId + index,
          type: 'error',
          message: e ?? '',
          title: 'Ошибка'
        }))
        const messages: I_Message[] = [...state.messages, ...errors]
        messages[messageIndex] = {
          type: 'error',
          message: 'Ошибка',
          id: action.meta.requestId,
          title: action.type.split('/')[1] + ': ошибка'
        }
        state.messages = messages
      }
    );
  }
})

export const {setNotification, setNotificationList, unsetNotification} = index.actions

export default index.reducer