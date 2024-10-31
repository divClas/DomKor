import {Dictionary} from "@/contexts/Dictionary.ts";
import {createReducer} from "@/store/mainThank.ts";
import {R_CITY} from "@/store/constants.ts";
import {I_City} from "@/types/city.ts";

const NAME = Dictionary.CITY.ru


export const {thank: cityThank, slice} = createReducer<
    I_City,
    {},
    {}>({
    URL: R_CITY,
    NAME,
})
export default slice.reducer