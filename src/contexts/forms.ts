import {I_Form} from "@/types/form.ts";
import {I_TenderEventForm} from "@/store/graphicKP";
import {A_SEND_EVENT, R_GRAPHIC_KP} from "@/store/constants.ts";

export const FormSubscribeKP: I_Form<I_TenderEventForm> = {
    route: R_GRAPHIC_KP + A_SEND_EVENT,
    fields: [
        {
            label: '',
            name: 'org_name',
            type: 'hidden',
            required: true
        },
    ],
    statusMessage: {
        success: 'Вам придет уведомление о статусе субподряда',
        error: 'Данные получены не корректно'}
}