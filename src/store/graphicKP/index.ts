import {Dictionary} from "@/contexts/Dictionary.ts";
import {createReducer} from "@/store/mainThank.ts";
import {R_GRAPHIC_KP} from "@/store/constants.ts";
import {I_GraphicKP} from "@/types/graphicKP.ts";

const NAME = Dictionary.GRAPHIC_KP.ru
export const {thank: graphicKPThank, slice} = createReducer<I_GraphicKP>({
    URL: R_GRAPHIC_KP,
    NAME
})
export default slice.reducer