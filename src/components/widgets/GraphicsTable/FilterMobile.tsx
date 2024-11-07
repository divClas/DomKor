import {FC} from "react";
import {Tabs} from "antd";
import {Dictionary} from "@/contexts/Dictionary.ts";
import {I_PayloadList} from "@/types/api.ts";
import {I_GRAPHIC_FILTER, I_GRAPHIC_SEARCH} from "@/store/graphic";
import {SearchForm} from "@/components/widgets/GraphicsTable/SearchForm.tsx";
import {DatePickerFilterMobile} from "@/components/widgets/GraphicsKpTable/Modile/DatePicker.tsx";
import {graphicDateFilters} from "@/contexts/filters.ts";

export const FilterMobile: FC<{
    payload: I_PayloadList<I_GRAPHIC_FILTER, I_GRAPHIC_SEARCH>,
    setPayload: (payload: I_PayloadList<I_GRAPHIC_FILTER, I_GRAPHIC_SEARCH>) => void
}> = ({
          payload,
          setPayload
      }) => {
    return (
        <Tabs
            defaultActiveKey={Dictionary.SEARCH.en}
            items={[
                {
                    key: Dictionary.SEARCH.en,
                    label: Dictionary.SEARCH.ru,
                    children: <SearchForm
                        setPayload={(payload) => {
                            setPayload(payload)
                        }}
                        payload={payload}
                    />
                },
                {
                    key: Dictionary.DATE_SELECT.en,
                    label: Dictionary.DATE_SELECT.ru,
                    children: (
                        <DatePickerFilterMobile<I_GRAPHIC_FILTER, I_GRAPHIC_SEARCH>
                            payloadFilter={payload.filter}
                            onChange={(filter) =>
                                setPayload({
                                    ...payload,
                                    filter,
                                    search: {
                                        ...payload.search,
                                    },
                                })
                            }
                            dateFilters={graphicDateFilters}
                        />)
                },
            ]}
        />
    )
}