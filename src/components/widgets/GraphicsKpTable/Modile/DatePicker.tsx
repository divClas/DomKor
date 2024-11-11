import {SelectUi} from "@/components/ui/Select";
import {useState} from "react";
import {I_DateFilters} from "@/contexts/filters.ts";
import {I_PayloadList} from "@/types/api.ts";
import {DataPickerContent} from "@/components/widgets/DataPickerContent";
import {Flex} from "antd";

export function DatePickerFilterMobile<I_FILTER extends object, I_SEARCH extends object>(props: {
    payloadFilter: I_PayloadList<I_FILTER, I_SEARCH>['filter']
    onChange: (filter: I_PayloadList<I_FILTER, I_SEARCH>['filter']) => void
    dateFilters: I_DateFilters<I_FILTER>[]
}) {
    const [dateFilterActive, setDateFilterActive] = useState<keyof I_FILTER>(props.dateFilters[0].filterKey)
    return (
        <Flex gap={10} vertical={true}>
            <SelectUi onChange={(val) => setDateFilterActive(val)}
                      value={dateFilterActive}
                      options={props.dateFilters.map(t => ({
                          value: String(t.filterKey),
                          label: t.label
                      }))}
                      icon={true}
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
        </Flex>
    )
}