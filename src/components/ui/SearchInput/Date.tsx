import {Flex, Popover} from "antd";
import {FC} from "react";
import {DataPickerContent} from "@/components/widgets/DataPickerContent";
import {ReactComponent as CalendarIcon} from "@/assets/calendar.svg";
import {I_DateFilter} from "@/types/api.ts";
import {ReactComponent as SortIcon} from "@/assets/sortIcon.svg";

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
              FROM: '',
              TO: ''
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
            <p className="table-header-text">{label}</p>
            <Popover
                content={(
                    <DataPickerContent
                        value={value}
                        onChange={onChange}
                    />
                )}
                trigger={"click"}
            >
                <Flex className={isDateFilter ? 'active-icon' : ''}>
                    <CalendarIcon className="icon cursor" />
                </Flex>
            </Popover>
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
