import {Dictionary} from "@/contexts/Dictionary.ts";
import {createReducer} from "@/store/mainThank.ts";
import {R_GRAPHIC_KP} from "@/store/constants.ts";
import {I_GraphicKP} from "@/types/graphicKP.ts";
import {I_PayloadList} from "@/types/api.ts";
import {FileBinary, T_Date} from "@/types/app.ts";

const NAME = Dictionary.GRAPHIC_KP.ru

export interface I_GraphicEventForm {
    phone: string
    email: string
    inn: string
    org_name: string
    file: FileBinary
}

export interface I_GRAPHIC_KP_FILTER {
    "SUBMISSION_DEADLINE": T_Date,
    "DATE_CREATE": T_Date,
    "TENDER_END_DATE": T_Date,
}

export const {thank: graphicKPThank, slice} = createReducer<
    I_GraphicKP,
    I_PayloadList<I_GRAPHIC_KP_FILTER, {}>,
    I_GraphicEventForm>({
    URL: R_GRAPHIC_KP,
    NAME
})
export default slice.reducer