import {Dictionary} from "@/contexts/Dictionary.ts";
import {createReducer} from "@/store/mainThank.ts";
import {I_GraphicEventForm, I_GraphicTender} from "@/types/graphicTender.ts";
import {R_GRAPHIC} from "@/store/constants.ts";
import {T_Date} from "@/types/app.ts";
import {I_PayloadList} from "@/types/api.ts";

const NAME = Dictionary.GRAPHIC.ru

export interface I_GRAPHIC_FILTER {
  "SMR_START": T_Date,
  "TENDER_PLANNED": T_Date,
  "WINNER_APPROVAL": T_Date,
  "CONTRACT_SIGNING": T_Date,
  COMPLETION_DATE: T_Date
}

export interface I_GRAPHIC_SEARCH {
  "NAME": string,
  "CITY": string,
  "WORK_TYPE": string,
  "OBJECTS": string,
}

export const {thank: graphicThank, slice} = createReducer<
  I_GraphicTender,
  I_PayloadList<I_GRAPHIC_FILTER, I_GRAPHIC_SEARCH>,
  I_GraphicEventForm>({
  URL: R_GRAPHIC,
  NAME,
})
export default slice.reducer