import {I_Form, I_FormFiled} from "@/types/form.ts";
import {A_SEND_EVENT, R_GRAPHIC, R_GRAPHIC_KP} from "@/store/constants.ts";
import {Dictionary} from "@/contexts/Dictionary.ts";

const _ConfirmFields: I_FormFiled[] = [
    {
        label: (`Согласие на обработку <a href="/personal-data"> персональных данных</a>`),
        name: 'confirm_personal',
        type: 'checkbox',
        // required: true
    },
    {
        label: `Согласие с <a href="/provisions-tender">положениями о проведении торгов</a>`,
        name: 'confirm_provisions',
        type: 'checkbox',
        // required: true
    }
]
export const FormSubscribeKP = (tender_id: string): I_Form => ({
    route: R_GRAPHIC_KP + A_SEND_EVENT,
    name: 'SubscribeKP',
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
        {
            label: 'Согласие на обработку персональных данных',
            name: 'confirm-personal',
            type: 'checkbox',
            link: '/personal-data',
            required: true
        },
        {
            label: 'Согласие с положениями о проведении торгов',
            name: 'confirm-provisions',
            type: 'checkbox',
            link: '/provisions-tender',
            required: true
        },
        ..._ConfirmFields
    ],
    btnLabel: Dictionary.SEND_EVENT.ru,
    successMessage: 'Вам придет уведомление о статусе тендера'
})
export const FormSubscribeNewTender = (graphic_id: string): I_Form => ({
    route: R_GRAPHIC + A_SEND_EVENT,
    name: 'SubscribeNewTender',
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
        },
        ..._ConfirmFields
    ],
    btnLabel: Dictionary.SEND_EVENT.ru,
    successMessage: 'Вам придет уведомление о статусе субподряда'
});
export const FormSubscribeNotification = (): I_Form => ({
    route: R_GRAPHIC + A_SEND_EVENT,
    name: 'SubscribeNotification',
    btnLabel: Dictionary.SUBSCRIBE.ru,
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
        },
        ..._ConfirmFields
    ],
    successMessage: 'Теперь вам будут приходить уведомления о новых тендерах',
});