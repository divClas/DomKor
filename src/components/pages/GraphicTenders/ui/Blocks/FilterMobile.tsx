import {Tabs} from "antd";
import {Dictionary} from "@/contexts/Dictionary.ts";
import {I_GRAPHIC_FILTER, I_GRAPHIC_SEARCH} from "@/store/graphic";
import {DatePickerFilterMobile} from "@/components/widgets/GraphicsKpTable/Modile/DatePicker.tsx";
import {graphicDateFilters} from "@/contexts/filters.ts";
import {useGraphicTenderPage} from "@/components/pages/GraphicTenders/model/context.ts";
import { MobileSearchForm } from "./MobileSearchForm";

export const FilterMobile = () => {
  const {payload, setPayload} = useGraphicTenderPage()
    return (
        <Tabs
            defaultActiveKey={Dictionary.SEARCH.en}
            items={[
                {
                    key: Dictionary.SEARCH.en,
                    label: Dictionary.SEARCH.ru,
                    children: <MobileSearchForm/>
                },
                {
                    key: Dictionary.DATE_SELECT.en,
                    label: Dictionary.DATE_SELECT.ru,
                    children: (
                        <DatePickerFilterMobile<I_GRAPHIC_FILTER, I_GRAPHIC_SEARCH>
                            payloadFilter={payload.filter}
                            onChange={(filter) =>
                                setPayload({
                                    filter,
                                })
                            }
                            dateFilters={graphicDateFilters}
                        />)
                },
            ]}
        />
    )
}