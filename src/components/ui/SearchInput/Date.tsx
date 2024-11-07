import {Flex} from "antd";
import {FC} from "react";
import {DataPickerContent} from "@/components/widgets/DataPickerContent";
import {ReactComponent as CalendarIcon} from "@/assets/calendar.svg";
import {I_DateFilter} from "@/types/api.ts";
import {ReactComponent as SortIcon} from "@/assets/sortIcon.svg";
import {PopoverWidget} from "@/components/ui/Popover";
import {InputUi} from "@/components/ui/Input";

export const SearchInputDate: FC<{
    label: string
    value: I_DateFilter | undefined
    onChange: (val: I_DateFilter) => void
    setSort: () => void
    isSort: boolean
    isDateFilter: boolean
}> = ({
          label,
          value = {
              FROM: "",
              TO: ""
          },
          setSort,
          onChange,
          isDateFilter,
          isSort
      }) => {
    return (
        <Flex justify="space-between"
              align="center"
        >
            <InputUi
                label={label}
                onChange={() => {
                }}
                disabled={true}
                type={'default'}
                val={value.FROM || value.TO ? `${value.FROM} ${value.TO ? '- ' + value.TO : ''}` : undefined}
            />
            <PopoverWidget
                content={(
                    <DataPickerContent
                        value={value}
                        onChange={onChange}
                    />
                )}
                title={'Выбор даты'}
            >
                <Flex className={isDateFilter ? 'active-icon' : ''}>
                    <CalendarIcon className="icon cursor" />
                </Flex>
            </PopoverWidget>
            <Flex className={isSort ? 'active-icon' : ''}>
                <SortIcon
                    className="icon"
                    onClick={setSort}
                    style={{cursor: "pointer"}}
                />
            </Flex>
        </Flex>
    )
}
