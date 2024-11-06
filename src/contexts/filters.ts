import {I_GRAPHIC_KP_FILTER} from "@/store/graphicKP";

export const tenderDateFilters: {
    filterKey: keyof I_GRAPHIC_KP_FILTER
    label: string
}[] = [
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