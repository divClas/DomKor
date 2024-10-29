import axios from 'axios'

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

export default () =>
    axios.create({
        baseURL: import.meta.env.VITE_API_HOST + import.meta.env.VITE_API_URL,
        headers: {
            "Content-Type": "application/json"
        }
    })