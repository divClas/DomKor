import {T_Date} from "@/types/app.ts";

export interface I_GraphicKP {
    "ID": string,
    "NAME": string,
    "DATE_CREATE": T_Date,
    "SUBMISSION_DEADLINE": T_Date,
    "TENDER_END_DATE": T_Date,
    "ADDRESS": string,
    "PERSON": string,
    "LEGAL_ENTITY": string,
    "CITY": string
}