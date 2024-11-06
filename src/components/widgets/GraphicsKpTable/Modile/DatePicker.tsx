import {SelectUi} from "@/components/ui/Select";
import {FC, useState} from "react";
import {I_GRAPHIC_KP_FILTER, I_GRAPHIC_KP_SEARCH} from "@/store/graphicKP";
import {tenderDateFilters} from "@/contexts/filters.ts";
import {I_PayloadList} from "@/types/api.ts";
import {DataPickerContent} from "@/components/widgets/DataPickerContent";

export const DatePickerFilterMobile: FC<{
    payloadFilter: I_PayloadList<I_GRAPHIC_KP_FILTER, I_GRAPHIC_KP_SEARCH>['filter']
    onChange: (filter: I_PayloadList<I_GRAPHIC_KP_FILTER, I_GRAPHIC_KP_SEARCH>['filter']) => void
}> = ({onChange, payloadFilter}) => {
    const [dateFilterActive, setDateFilterActive] = useState<keyof I_GRAPHIC_KP_FILTER>('DATE_CREATE')
    return (
        <div>
            <SelectUi onChange={(val) => setDateFilterActive(val)}
                      value={dateFilterActive}
                      options={tenderDateFilters.map(t => ({
                          value: t.filterKey,
                          label: t.label
                      }))}
                      className={'w-100'}
            />
            {tenderDateFilters.map(tf => (
                <div
                    key={tf.filterKey}
                    className={tf.filterKey === dateFilterActive ? '' : 'display-none'}>
                    <DataPickerContent
                        value={payloadFilter?.[tf.filterKey]}
                        onChange={(value) =>
                            onChange({
                                ...payloadFilter,
                                [tf.filterKey]: value,
                            })
                        }
                    />
                </div>
            ))}
        </div>
    )
}