import {SelectUi} from "@/components/ui/Select";
import {useState} from "react";
import {I_GRAPHIC_KP_FILTER} from "@/store/graphicKP";
import {I_DateFilters} from "@/contexts/filters.ts";
import {I_PayloadList} from "@/types/api.ts";
import {DataPickerContent} from "@/components/widgets/DataPickerContent";

export function DatePickerFilterMobile<I_FILTER extends object, I_SEARCH extends object>(props: {
    payloadFilter: I_PayloadList<I_FILTER, I_SEARCH>['filter']
    onChange: (filter: I_PayloadList<I_FILTER, I_SEARCH>['filter']) => void
    dateFilters: I_DateFilters<I_FILTER>[]
}) {
    const [dateFilterActive, setDateFilterActive] = useState<keyof I_GRAPHIC_KP_FILTER>()
    return (
        <div>
            <SelectUi onChange={(val) => setDateFilterActive(val)}
                      value={dateFilterActive}
                      options={props.dateFilters.map(t => ({
                          value: String(t.filterKey),
                          label: t.label
                      }))}
                      placeholder={"Выбрать тип даты"}
                      className={'w-100'}
            />
            {props.dateFilters.map(tf => (
                <div
                    key={String(tf.filterKey)}
                    className={tf.filterKey === dateFilterActive ? '' : 'display-none'}
                >
                    <DataPickerContent
                        value={props.payloadFilter?.[tf.filterKey]}
                        onChange={(value) =>
                            props.onChange({
                                ...props.payloadFilter,
                                [tf.filterKey]: value,
                            })
                        }
                    />
                </div>
            ))}
        </div>
    )
}