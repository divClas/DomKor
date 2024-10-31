import axios from 'axios'
import {I_Response} from "@/types/api.ts";

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


export async function uploadFormData<T>(path: string, data: FormData): Promise<I_Response<T>> {
    try {
        const res = await axios.post<I_Response<T>>(import.meta.env.VITE_API_HOST + import.meta.env.VITE_API_URL + path, data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return res.data
    } catch (error: { message: string } | unknown) {
        return {
            errors: [

            ],
            status: 'error',
            data: false as T
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