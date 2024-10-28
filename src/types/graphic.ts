import {T_Date} from "@/types/app.ts";

export interface I_Graphic {
    "ID": string,
    "NAME": string,
    "WORK_TYPE": string,
    "OBJECTS": string,
    "SMR_START": T_Date,
    "TENDER_PLANNED": T_Date,
    "WINNER_APPROVAL": T_Date,
    "CONTRACT_SIGNING": T_Date
}
