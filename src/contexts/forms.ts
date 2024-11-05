import {I_Form} from "@/types/form.ts";
import {A_SEND_EVENT, R_GRAPHIC, R_GRAPHIC_KP} from "@/store/constants.ts";

export const FormSubscribeKP = (tender_id: string): I_Form => ({
    route: R_GRAPHIC_KP + A_SEND_EVENT,
    fields: [
        {
            label: '',
            name: 'tender_id',
            type: 'hidden',
            required: true,
            defaultValue: tender_id
        },
        {
            label: 'ИНН Организации',
            name: 'inn',
            type: 'orgSelect',
            required: true
        },
        {
            label: 'Номер телефона (СМС рассылка)',
            name: 'phone',
            type: 'phone',
            required: true
        },
        {
            label: 'Почта',
            name: 'email',
            type: 'email',
            required: true
        },
        {
            label: 'Прикрепить файл (не более 100 МБ)',
            name: 'file',
            type: 'upload',
            required: true
        },
    ],
    successMessage: 'Вам придет уведомление о статусе субподряда'
})
export const FormSubscribeNewTender = (graphic_id: string): I_Form => ({
    route: R_GRAPHIC + A_SEND_EVENT,
    fields: [
        {
            label: '',
            name: 'graphic_id',
            type: 'hidden',
            required: true,
            defaultValue: graphic_id
        },
        {
            label: '',
            name: 'form_type',
            type: 'hidden',
            required: true,
            defaultValue: 'REPLY'
        },
        {
            label: 'ИНН Организации',
            name: 'inn',
            type: 'orgSelect',
            required: true
        },
        {
            label: 'Номер телефона (СМС рассылка)',
            name: 'phone',
            type: 'phone',
            required: true
        },
        {
            label: 'Почта',
            name: 'email',
            type: 'email',
            required: true
        }
    ],
    successMessage: 'Теперь вам будут приходить уведомления о новых тендерах'
})
export const FormSubscribeNotification: I_Form = {
    route: R_GRAPHIC + A_SEND_EVENT,
    fields: [
        {
            label: '',
            name: 'form_type',
            type: 'hidden',
            required: true,
            defaultValue: 'SUBSCRIBE_NOTIFICATIONS'
        },
        {
            label: 'ИНН Организации',
            name: 'inn',
            type: 'orgSelect',
            required: true
        },
        {
            label: 'Номер телефона (СМС рассылка)',
            name: 'phone',
            type: 'phone',
            required: true
        },
        {
            label: 'Почта',
            name: 'email',
            type: 'email',
            required: true
        }
    ],
    successMessage: 'Вам придет уведомление о статусе субподряда',
}