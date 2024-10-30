import axios from 'axios'
import {RcFile} from "antd/es/upload";

export const daDataFetch = (val: string) =>
    axios.post<{
        suggestions: {
            value: string
            unrestricted_value: string
            data: {
                inn: string
            }
        }[]
    }>('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party', {
        count: val.length,
        query: val
    }, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Token " + import.meta.env.VITE_API_KEY_DADATA
        }
    })
export interface I_PayloadFile<I_Entity> {
    ID: number
    data: File | string | Blob | RcFile
    key: (keyof I_Entity)
}
export async function uploadFile<T>(path: string, file: I_PayloadFile<T>['data'], name: (keyof T), tkn = AuthToken()): Promise<I_Response<T>> {
    try {
        const formData = new FormData()
        formData.append(String(name), file)
        const res = await axios.post<I_Response<T>>(import.meta.env.VITE_API_HOST + import.meta.env.VITE_API_URL + path, formData, {
            headers: {
                "Authorization": import.meta.env.VITE_API_ACCESS_TOKEN + '::' + tkn,
                "Content-Type": "multipart/form-data"
            }
        });
        return res.data
    } catch (error: { message: string } | unknown) {
        return {
            error: true,
            message: 'Ошибка сервера',
            data: [] as I_Error[]
        }
    }
}
export default () =>
    axios.create({
        baseURL: import.meta.env.VITE_API_HOST + import.meta.env.VITE_API_URL,
        headers: {
            "Content-Type": "application/json"
        }
    })