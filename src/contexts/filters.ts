import {I_GRAPHIC_KP_FILTER} from "@/store/graphicKP";
import {I_GRAPHIC_FILTER} from "@/store/graphic";

export interface I_DateFilters<I_Filter> {
    filterKey: keyof I_Filter
    label: string
}

export const tenderDateFilters: I_DateFilters<I_GRAPHIC_KP_FILTER>[] = [
    {
        filterKey: 'DATE_CREATE',
        label: 'Дата публикации'
    },
    {
        filterKey: 'TENDER_END_DATE',
        label: 'Дата окончания тендера'
    },
    {
        filterKey: 'SUBMISSION_DEADLINE',
        label: 'Дата окончания приема заявок'
    },
]
export const graphicDateFilters: I_DateFilters<I_GRAPHIC_FILTER>[] = [
    {
        filterKey: 'SMR_START',
        label: 'Старт СМР по оперативному плану'
    },
    {
        filterKey: 'TENDER_PLANNED',
        label: 'Плановая дата проведения тендера'
    },
    {
        filterKey: 'WINNER_APPROVAL',
        label: 'Плановая дата утверждения победителя тендера'
    },
    {
        filterKey: 'CONTRACT_SIGNING',
        label: 'Плановая дата подписания контракта'
    },
]