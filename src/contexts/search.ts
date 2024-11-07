import {I_GRAPHIC_SEARCH} from "@/store/graphic";

export interface I_DateSearch<I_Search> {
    filterKey: keyof I_Search | 'ALL'
    label: string
    radioLabel: string
}

export const graphicDateSearch: I_DateSearch<I_GRAPHIC_SEARCH>[] = [
    {
        filterKey: 'WORK_TYPE',
        label: 'Видам работ',
        radioLabel: 'Поиск по видам работ'
    },
    {
        filterKey: 'OBJECTS',
        label: 'Объекты',
        radioLabel: 'Поиск по объектам'
    },
]