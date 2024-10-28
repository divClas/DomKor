import {Dictionary} from "@/contexts/Dictionary.ts";
import {createReducer} from "@/store/mainThank.ts";
import {I_Graphic} from "@/types/graphic.ts";
import {R_GRAPHIC} from "@/store/constants.ts";

const NAME = Dictionary.GRAPHIC.ru
export const {thank: graphicThank, slice} = createReducer<I_Graphic>({
    URL: R_GRAPHIC,
    NAME
})
export default slice.reducer