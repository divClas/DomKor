import {I_FormFiled} from "@/types/app.ts";

export interface I_Form<I_FormFields> {
    statusMessage: {
        success: string
        error: string
    }
    route: string
    fields: I_FormFiled<I_FormFields>[]
}