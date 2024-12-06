import {T_Date} from "@/types/app.ts";

export interface I_GraphicTender {
    ID: string,
    NAME: string,
    WORK_TYPE: string,
    OBJECTS: string,
    CITY: string,
    SMR_START: T_Date,
    TENDER_PLANNED: T_Date,
    WINNER_APPROVAL: T_Date,
    CONTRACT_SIGNING: T_Date
    COMPLETION_DATE: T_Date
    START_WORK_DATE: T_Date
}

export interface I_GraphicEventForm {
    graphic_id: I_GraphicTender['ID']
    phone: string
    email: string
    inn: string
    org_name: string
    form_type: "SUBSCRIBE_NOTIFICATIONS" | "REPLY"
}